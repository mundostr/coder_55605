import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  // Necesitamos importar esta feature para que el módulo pueda utilizar Mongoose
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
