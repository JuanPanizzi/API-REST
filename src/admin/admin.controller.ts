import { Controller, Get, Param, Delete, UseGuards, Request, Query, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PostService } from '../post/post.service';
// import { ROLES } from '../auth/constants/roles';
import { UserService } from '../Users/User.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ADMINISTRACIÓN')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) { }

  @Roles('ADMIN')
  @Delete('/users/:id')
  @ApiOperation({
    summary: 'Eliminar un usuario (solo usuarios administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Se eliminó el usuario correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Se necesita ser administrador para ejecutar esta acción.',
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos.'
  })
  remove(@Param('id') id: string, @Request() req) {

    if(!req.user.isAdmin){
      throw new UnauthorizedException('se necesita ser administrador para acceder a esta ruta')
    }
    return this.userService.remove(id);
  }

  @Roles('ADMIN')
  @Get('/users')
  @ApiOperation({
    summary: 'Buscar todos los usuarios (solo usuarios administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Se buscaron los usuarios correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Se necesita ser administrador para ejecutar esta acción.',
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos.'
  })
  findUsers(@Request() req) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException('se necesita ser administrador para acceder a esta ruta')
    }
    return this.userService.findAll();
  }


@Roles('ADMIN')
  @Get('/posts')
  @ApiOperation({
    summary: 'Buscar todos los posts (solo usuarios administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Se buscaron los posts correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Se necesita ser administrador para ejecutar esta acción.',
  })
  @ApiResponse({
    status: 500,
    description: 'Solicitud incorrecta. Revisar que los datos especificados sean correctos.'
  })
  findPosts(@Request() req, @Query('limit') limit) {
    if(!req.user.isAdmin){
      throw new UnauthorizedException('se necesita ser administrador para acceder a esta ruta')
    }
    return this.postService.findAll(limit);
  }
}
