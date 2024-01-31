import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, UnauthorizedException } from '@nestjs/common';
import { UserService } from './User.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LocalAuthGuard} from '../auth/strategies/localAuth.guard'
import { UserInt } from './interfaces/UserInt';
import { JwtAuthGuard } from '../auth/strategies/jwt-guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AccesToken } from './interfaces/AccesToken';
import { AccessTokenModel } from './interfaces/AccesTokenModel';

@ApiTags('USUARIOS')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post()
  @ApiOperation({
    summary: 'Crear un usuario nuevo',
    description: 'Se crea un usuario nuevo'
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Se creó el usuario correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Petición inválida. Especificar bien los datos para hacer la petición.'
  })
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserInt> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    summary: 'Loguear usuario',
    description: 'Se realiza el loguin de un usuario que esté previamente registrado (se retorna un token de acceso)',
  })
  @ApiResponse({
    status: 201,
    description: 'Se realizó el login correctamente',
    type: AccessTokenModel
  })
  @ApiResponse({
    status: 400,
    description: 'Petición inválida. Especificar bien los datos para hacer la petición. '
  })
  @ApiResponse({
    status: 401,
    description: 'Login incorrecto'
  })
  @ApiBody({ type: LoginDto })
  async login(@Request() req): Promise<AccesToken> {
    return this.userService.login(req.user)
  }


  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Devuelve una lista de todos los usuarios registrados.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: CreateUserDto
  })
  @ApiResponse({
    status: 400,
    description: 'Petición inválida. Especificar bien los datos para hacer la petición. '
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado'
  })
  findAll(): Promise<UserInt[]> {
    return this.userService.findAll();
  }



  @Get(':id')
  @ApiOperation({
    summary: 'Obtener usuario por id',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado'
  })
  @ApiResponse({
    status: 500,
    description: 'El id de usuario especificado es incorrecto o no existe en el registro.'
  })
  findOne(@Param('id') id: string): Promise<UserInt> {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar datos de un usuario especifico',
    description: 'Se busca un usuario por id y se actualizan los datos especificados (solo para usuarios administradores). Se necesita enviar el token de acceso'
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Se actualizaron los campos del usuario correctamente'
  })
  @ApiResponse({
    status: 400,
    description: 'Petición inválida. Especificar bien los datos para hacer la petición. '
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Se necesita ser administrador para realizar esta acción'
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {

    if (req.user._id == id || req.user.isAdmin) {

      return this.userService.update(id, updateUserDto);

    } else {
      throw new UnauthorizedException(
        'Usuario no autorizado. Se necesita ser administrador para realizar esta acción.'
      );
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Elimina un usuario específico',
    description: 'Se busca un usuario por id y se elimina del registro (solo para usuarios administradores). Se necesita enviar el token de acceso.'
  })
  @ApiResponse({
    status: 200,
    description: 'Se elimino el usuario correctamente.'
  })
  @ApiResponse({
    status: 500,
    description: 'El id de usuario especificado es incorrecto o no existe en el registro.'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autorizado. Se necesita ser administrador para realizar esta acción.'
  })
  remove(@Param('id') id: string, @Request() req) {

    if (req.user.isAdmin) {
      return this.userService.remove(id);
    } else {
      throw new UnauthorizedException(
        'Solo los administradores pueden borrar usuarios.'
      );
    }
  }
}
