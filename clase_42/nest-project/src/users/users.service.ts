import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

const usersDatabase: Array<User> = [];

@Injectable()
export class UsersService {
  create(newUser: User) {
    usersDatabase.push(newUser);
    return newUser;
  }

  findAll() {
    return usersDatabase;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
