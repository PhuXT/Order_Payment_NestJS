import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayLoadDto } from './payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: PayLoadDto) {
    const payload = { email: user.email, ID: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
