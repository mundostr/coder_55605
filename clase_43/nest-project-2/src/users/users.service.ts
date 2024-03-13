import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schema/user.schema';

/**
 * Importamos el modelo y esquema, implementando el CRUD.
 */
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<UsersDocument>) {
  }

  /**
   * Indicamos que newUser es de tipo CreateUserDto, esto automáticamente
   * inyectará el DTO en la cadena, realizando las verificaciones correspondientes
   * antes de entregar newUser al modelo.
   */
  async create(newUser: CreateUserDto): Promise<object> {
    return { status: 'OK', data: await this.usersModel.create(newUser) };
  }

  async findAll(): Promise<object> {
    return { status: 'OK', data: await this.usersModel.find().lean()};
  }

  async findOne(id: string) {
    return await this.usersModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.usersModel.findByIdAndDelete(id);
  }
}
