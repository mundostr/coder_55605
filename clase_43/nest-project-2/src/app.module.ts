import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import Logger from './middleware/logger';
// Vemos como podemos también utilizar módulos externos de forma tradicional
// como en este caso dotenv() para obtener acceso a variables de entorno, en
// lugar de la solución de config propuesta originalmente por Nest.
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [UsersModule, MongooseModule.forRoot(process.env.MONGOOSE_REMOTE_URL)],
  controllers: [AppController],
  providers: [AppService],
})

// Esta es una "inyección" global de un módulo, es decir, el equivalente
// a un use() standard de Express. Logger será inyectado en la cadena de
// cualquier solicitud realizada a cualquier ruta.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes('*');
  }
}
