import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderCreateDto } from './dto/createOrder.dto';
import { Order } from './order.schema';
import { ORDER_STATUS_ENUM, PAYMENT_STATUS_ENUM } from './orders.enum';
import { OrderRepository } from './orders.repository';
@Injectable()
export class OrdersService {
  constructor(
    @Inject('PAYMENT_SERVICE') private client: ClientProxy,
    private orderRepository: OrderRepository,
  ) {}

  // CREATE ORDER
  async create(userID, orderCreateDto: OrderCreateDto): Promise<Order> {
    // Total price
    const totalPrice = orderCreateDto.products.reduce((pre, curr) => {
      return pre + curr.quantity * curr.productPrice;
    }, 0);
    orderCreateDto.totalPrice = totalPrice;

    const order = await this.orderRepository.create(userID, orderCreateDto);
    const payment = {
      totalPrice: order.totalPrice,
      token: process.env.TOKEN_PAYMENT,
    };
    let paymentStatus = await this.client
      .send('paymentStatus', payment)
      .toPromise();

    if (paymentStatus === PAYMENT_STATUS_ENUM.DECLINED) {
      paymentStatus = ORDER_STATUS_ENUM.CANCELED;
    }
    // update order status
    await this.orderRepository.update(
      userID,
      order._id.toString(),
      paymentStatus,
    );
    if (paymentStatus === ORDER_STATUS_ENUM.CONFIRMED) {
      setTimeout(async () => {
        await this.orderRepository.update(
          userID,
          order._id.toString(),
          ORDER_STATUS_ENUM.DELIVERED,
        );
      }, 20000);
    }
    return order;
  }

  // CANCEL ORDER
  async cancelOrder(userID: string, orderID: string): Promise<any> {
    const order = await this.orderRepository.getDetailOrder(userID, orderID);
    if (order.orderStatus === ORDER_STATUS_ENUM.DELIVERED) {
      throw new ForbiddenException('The order has been delivered');
    }
    return await this.orderRepository.update(
      userID,
      orderID,
      ORDER_STATUS_ENUM.CANCELED,
    );
  }

  //GET ORDER
  async getDetailOrder(userID: string, orderID: string): Promise<Order> {
    return await this.orderRepository.getDetailOrder(userID, orderID);
  }

  // GET STATUS
  async getStatus(userID: string, orderID: string): Promise<ORDER_STATUS_ENUM> {
    const order = await this.orderRepository.getDetailOrder(userID, orderID);
    return order.orderStatus;
  }

  // GET ORDERS
  async getOrders(userID: string): Promise<any> {
    return await this.orderRepository.getOrders(userID);
  }
}
