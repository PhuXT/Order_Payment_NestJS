import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  //[POST] API/V1/USERS/REGISTER
  @Post('/register')
  async register(@Body() userCreateDto: UserCreateDto) {
    const newUser = await this.userService.create(userCreateDto);
    return newUser;
  }
}
