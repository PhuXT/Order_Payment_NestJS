import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
// import { JwtAuthGuard } from '.';
import { OrderCreateDto } from './dto/createOrder.dto';
import { reqLoinDto } from './dto/reqLogin.dto';
import { Order } from './order.schema';
import { ORDER_STATUS_ENUM } from './orders.enum';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  //[POST] API/V1/ORDERS/
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOrder(
    @Request() req: reqLoinDto,
    @Body() orderCreateDto: OrderCreateDto,
  ): Promise<Order> {
    return await this.orderService.create(req.user.userId, orderCreateDto);
  }

  //[PATCH] API/V1/ORDERS/:ORDERID/CANCELLATIONS
  @UseGuards(JwtAuthGuard)
  @Patch(':orderID/cancellations')
  async cancelOrder(@Request() req: reqLoinDto, @Param() params): Promise<any> {
    return await this.orderService.cancelOrder(req.user.userId, params.orderID);
  }

  //[GET] API/V1/ORDERS
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getOrders(@Request() req: reqLoinDto): Promise<any> {
    return this.orderService.getOrders(req.user.userId);
  }

  //[GET] API/V1/ORDERS/:ORDERID
  @UseGuards(JwtAuthGuard)
  @Get(':orderID')
  async getDetailOrder(
    @Request() req: reqLoinDto,
    @Param() params,
  ): Promise<Order> {
    return await this.orderService.getDetailOrder(
      req.user.userId,
      params.orderID,
    );
  }
  //[GET] API/V1/ORDERS/:ID/status
  @UseGuards(JwtAuthGuard)
  @Get(':orderID/status')
  async getStatus(
    @Request() req: reqLoinDto,
    @Param() params,
  ): Promise<ORDER_STATUS_ENUM> {
    return await this.orderService.getStatus(req.user.userId, params.orderID);
  }
}
