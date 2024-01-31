import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from '../constants/key-decorators';
import { ROLES } from '../constants/roles';
// import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {



    const IsPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )

    if (IsPublic) {
      return true;
    }
    
    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler()
    );

    const admin = this.reflector.get<string>(
      ADMIN_KEY,
      context.getHandler());


    const request = context.switchToHttp().getRequest();

    const { user } = request


    if(user.isAdmin){
      user.role = 'ADMIN'
    }

    if(roles === undefined){
      if(!admin){
        console.log('no !admin')
        return true
      } else if(admin && user.Role === admin){
        return true
      }else{
        console.log('En false')
            console.log(admin)
            console.log(user.isAdmin)
            console.log('userRole:')
            console.log(user.Role)
            throw new UnauthorizedException('Necesitas ser administrador para acceder a esta ruta')
    
      }
    }

    const isAuth = roles.some((role)=> role === user.role)
    if(!isAuth){
      console.log('entro en !is Auth')
      console.log('abajo es isAuth')
      console.log(isAuth)
      throw new UnauthorizedException('Necesitas ser administrador para acceder a esta ruta')

    }
    return true;


    // MI DESARROLLO
    // const request = context.switchToHttp().getRequest();
    //  const user = request.user;

    // const roles = this.reflector.get<Array<keyof typeof ROLES>>(
    //   ROLES_KEY,
    //   context.getHandler()
    // );

    // const admin = this.reflector.get<string>(
    //   ADMIN_KEY,
    //   context.getHandler());


    //   if(admin || user.isAdmin){

    //     console.log('en true');
    //     console.log(admin)
    //     return true
    //   }else{
    //     console.log('En false')
    //     console.log(admin)
    //     console.log(user.isAdmin)
    //     throw new UnauthorizedException('Necesitas ser administrador para acceder a esta ruta')

    //   }


    //FIN MI DESARROLLO 

    // if(roles === undefined){
    //   if(!admin){
    //     return true
    //   }else if(admin && user.isAdmin){

    //     return true
    //   }else{
    //     console.log('EN FALSE ADMIN:')
    //     console.log('admin:')
    //     console.log(admin)
    //     console.log('user:')
    //     console.log(user)
    //     console.log('userIsAdmin:')
    //     console.log(user.isAdmin)

    //     throw new UnauthorizedException('Necesitas ser administrador para acceder a esta ruta')
    //   }
    // }



  }
}
