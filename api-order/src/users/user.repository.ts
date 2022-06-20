import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserCreateDto } from './dto/UserCreate.dto';
import { Order, OrderDocument } from 'src/orders/order.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  // find
  async find(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }
  // CREATE USER
  async create(userCreateDto: UserCreateDto): Promise<User> {
    const user = await this.userModel.findOne({ email: userCreateDto.email });
    if (user) throw new ConflictException('Email already exists');
    const newUser = new this.userModel(userCreateDto);
    return await newUser.save();
  }
}
