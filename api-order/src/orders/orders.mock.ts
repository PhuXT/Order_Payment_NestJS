import { OrderCreateDto } from './dto/createOrder.dto';
import { ORDER_STATUS_ENUM } from './orders.enum';

export const mockUserId = '62aad955eba770cfce2d6649';
export const mockOrderId = '62b035721e041e4e49f909d4';
export const mockStatusOrder = ORDER_STATUS_ENUM;

export const mockOrder = {
  userOrderID: '62aad955eba770cfce2d6649',
  products: [
    {
      productID: '888888888888888888888888',
      productName: 'Lexus 191',
      productPrice: 100000,
      quantity: 5,
    },
    {
      productID: '888',
      productName: 'Asus',
      productPrice: 2,
      quantity: 3,
    },
  ],
  address: 'Nam Dinh',
  phone: '123456789',
  orderStatus: 'CREATED',
  totalPrice: 500006,
  _id: '62b035721e041e4e49f909d4',
  createdAt: 'Mon Jun 20 2022 15:53:06 GMT+0700 (Indochina Time)',
  updatedAt: '2022-06-20T08:53:06.000Z',
  __v: 0,
};

export const mockCreateOrder: OrderCreateDto = {
  products: [
    {
      productID: '888888888888888888888888',
      productName: 'Lexus 191',
      productPrice: 100000,
      quantity: 5,
    },
    { productID: '888', productName: 'Asus', productPrice: 2, quantity: 3 },
  ],
  address: 'Nam Dinh',
  phone: '123456789',
  id: '',
  totalPrice: 0,
};
