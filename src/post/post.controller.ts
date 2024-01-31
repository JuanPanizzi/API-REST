import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Request, Query, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostInterface } from './interfaces/postInterface';
import { JwtAuthGuard } from '../auth/strategies/jwt-guard';
// import { QuerySearch } from './interfaces/querySearch';
import { QueryFilter } from './interfaces/queryFilter';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuerySearch } from './interfaces/querySearch';

@ApiTags('POSTS')
@Controller('posts')
export class PostController {

  constructor(private readonly postService: PostService) {}

  @Get('/search')
  @ApiOperation({
    summary: 'Buscar posts por titulo, autor, contenido o categoría',
  })
  @ApiResponse({
    status: 200,
    description: 'Se buscaron los posts correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Petición inválida. Revisar que se haya pasado algún parámetro de búsqueda.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron posts con los parámetros proporcionados.',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'categorias', required: false, isArray: true })
  @ApiQuery({ name: 'contenido', required: false })
  @ApiQuery({ name: 'autor', required: false })
  @ApiQuery({ name: 'titulo', required: false })
  getByQuery(@Query() queries: QuerySearch): Promise<PostInterface | PostInterface[]>  {

    if (!queries || Object.keys(queries).length === 0) {
          throw new BadRequestException(
            'Por favor ingrese un parametro para buscar por titulo, autor, contenido, etc.'
          )
        }
        return this.postService.getByQuery(queries);
    }
  

  @Get('/filter')
  @ApiOperation({
    summary: 'Buscar posts por categoría o autor',
  })
  @ApiResponse({
    status: 200,
    description: 'Se buscaron los posts correctamente.'
  })
  @ApiResponse({
    status: 400,
    description: 'Petición inválida. Revisar que se haya pasado algún parámetro de búsqueda.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron posts con los parámetros proporcionados.',
  })
  @ApiQuery({ name: 'categorias', required: false, isArray: true })
  @ApiQuery({ name: 'autor', required: false })
  getByFilter(@Query() query: QueryFilter) {
    
    if (!query || Object.keys(query).length === 0) {
      throw new BadRequestException(
       'Por favor ingrese un parametro para buscar por autor o por categorías'
      )
    }
    return this.postService.getByFilter(query)
  }


  @Get()
  @ApiOperation({
    summary: 'Buscar todos los posts',
  })
  @ApiResponse({
    status: 200,
    description: 'Se buscaron los posts correctamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos.'
  })
  findAll(@Query('limit') limit?: number) {
    return this.postService.findAll(limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar un post en específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Se buscaron los posts correctamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos (sobretodo el id del post).'
  })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get('/user/:userId')
  @ApiOperation({
    summary: 'Buscar los posts de un usuario en específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Se buscaron los posts correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron posts para el usuario'
  })
  @ApiParam(
    { name: 'userId', description: 'ID del usuario', type: 'string' || 'number' }
  )
  findUserPosts(@Param('userId') userId: number | string) {

    return this.postService.findAllUserPosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreatePostDto })
  @ApiOperation({
    summary: 'Crear un nuevo post (solo usuarios registrados)',
  })
  @ApiResponse({
    status: 201,
    description: 'Se creó el post correctamente.'
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos.'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Se necesita loguearse para realizar esta acción (es necesario enviar el token de acceso).'
  })
  @ApiResponse({
    status: 400,
    description: 'Peticion invalida. Revisar bien los campos especificados. En el userId se puede pasar un numero o caracteres.'
  })
  create(@Body() createPostDto: CreatePostDto): Promise<PostInterface> {
    return this.postService.create(createPostDto);
  }



  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiBody({ type: UpdatePostDto })
  @ApiOperation({
    summary: 'Actualizar los campos de un post en específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Se actualizó el post correctamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos (sobretodo el id del post).'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Solo se puede actualizar los posteos propios, o modificar otros en caso de ser administrador'
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req) {

    const post: PostInterface = await this.postService.findOne(id)

    if (req.user.name == post.autor || req.user.isAdmin) {
      return this.postService.update(id, updatePostDto);
    } else {
      throw new UnauthorizedException(
        'Solo se puede actualizar los posteos propios, o modificar otros en caso de ser administrador'
      )
    }

  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar un post en específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Se eliminó el post correctamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos (sobretodo el id del post).'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Solo se puede eliminar los posteos propios, o eliminar otros en caso de ser administrador'
  })
  async remove(@Param('id') id: string, @Request() req) {

    const post: PostInterface = await this.postService.findOne(id)

    if (req.user.name == post.autor || req.user.isAdmin) {
      return this.postService.remove(id);
    } else {
      throw new UnauthorizedException(
        'Solo se puede eliminar los posteos propios, o eliminar otros en caso de ser administrador'
      )
    }

  }
}
