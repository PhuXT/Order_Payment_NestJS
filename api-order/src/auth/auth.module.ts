import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';
import { LocalStrategy } from './local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { Order, OrderSchema } from 'src/orders/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.SECRET_KEY}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
