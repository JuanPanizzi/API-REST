import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Trabajo Final de Nest Js :)!';
  }
}

