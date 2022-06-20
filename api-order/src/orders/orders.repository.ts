import { OrderDocument, Order } from './order.schema';
import { UserDocument, User } from '../users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { OrderCreateDto } from './dto/createOrder.dto';
import { Model } from 'mongoose';
import { ORDER_STATUS_ENUM } from './orders.enum';
@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  // CREATE
  async create(userID: string, orderCreateDto: OrderCreateDto) {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) throw new NotFoundException('User not exist');

    const newOrderObj = { ...orderCreateDto, userOrderID: userID };
    const newOrder = new this.orderModel(newOrderObj);

    // update orderID to the Users Table
    const orderID = newOrder._id.toString();
    await this.userModel.updateOne(
      { _id: userID },
      { $push: { orderIDS: orderID } },
    );
    return newOrder.save();
  }

  // UPDATE STATUS
  async update(
    userID: string,
    orderID: string,
    orderStatus: ORDER_STATUS_ENUM,
  ) {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) throw new NotFoundException('User not exist');
    const order = await this.orderModel.findOne({ _id: orderID });
    if (!order) throw new NotFoundException('Order not exist');
    if (!user.orderIDS.includes(orderID)) {
      throw new ForbiddenException('You can only update your orders');
    }
    return await this.orderModel.findByIdAndUpdate(
      { _id: orderID },
      { $set: { orderStatus: orderStatus } },
      { new: true },
    );
  }

  // get DETAIL ORDER
  async getDetailOrder(userID: string, orderID: string): Promise<Order> {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) throw new NotFoundException('User not exist');
    const order = await this.orderModel.findOne({ _id: orderID });
    if (!order) throw new NotFoundException('Order not exist');
    if (!user.orderIDS.includes(orderID)) {
      throw new ForbiddenException('You can only get your orders');
    }

    return order;
  }

  // GET ORDERS
  async getOrders(userID: string): Promise<any> {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) throw new NotFoundException('User Not Found');
    const OrderIDS = user.orderIDS;
    const orders = await this.orderModel.find({ _id: { $in: OrderIDS } });
    return orders;
  }
}
