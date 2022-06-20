import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/UserCreate.dto';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  // FIND USER
  async findByEmail(email: string) {
    return await this.userRepository.find(email);
  }

  // REGISTER
  async create(userCreateDto: UserCreateDto): Promise<User> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      userCreateDto.password,
      saltOrRounds,
    );
    userCreateDto.password = hashPassword;

    const newUser = await this.userRepository.create(userCreateDto);
    return newUser;
  }
}
