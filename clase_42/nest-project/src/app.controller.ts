import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    // return this.appService.getHello();
    // Solo como prueba, modificamos el endpoint para retornar
    // un objeto en lugar de un string
    return { status: 'OK', data: this.appService.getHello() };
  }
}
