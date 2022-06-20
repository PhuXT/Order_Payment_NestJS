import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ORDER_STATUS_ENUM } from './orders.enum';

export type OrderDocument = Order & Document;
type item = {
  productID: string;
  productName: string;
  productPrice: number;
  quantity: number;
};

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userOrderID: string;

  @Prop({ required: true, default: [] })
  products: item[];

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: ORDER_STATUS_ENUM.CREATED, required: true })
  orderStatus: ORDER_STATUS_ENUM;

  @Prop({ default: 0 })
  totalPrice: number;

  @Prop()
  createdAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
