import { Test, TestingModule } from '@nestjs/testing';
import { OrderCreateDto } from './dto/createOrder.dto';
import { reqLoinDto } from './dto/reqLogin.dto';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('PaymentController', () => {
  let orderController: OrdersController;
  const req = new reqLoinDto();
  req.user = {
    userId: '123',
    email: 'test@gmail.com',
  };
  const param = { orderID: '112222' };
  const mockOrderService = {
    create: jest.fn(),
    cancelOrder: jest.fn(),
    getDetailOrder: jest.fn(),
    getStatus: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrderService)
      .compile();

    orderController = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  it('[success] - create', async () => {
    mockOrderService.create.mockResolvedValue(true);
    const result = await orderController.createOrder(req, new OrderCreateDto());
    expect(result).toBe(true);
  });

  it('[success] - cancelOrder', async () => {
    mockOrderService.cancelOrder.mockResolvedValue(true);
    const result = await orderController.cancelOrder(req, '12asdfsdf');
    expect(result).toBe(true);
  });

  it('[success] - cancelOrder', async () => {
    mockOrderService.cancelOrder.mockResolvedValue(true);
    const result = await orderController.cancelOrder(req, '12asdfsdf');
    expect(result).toBe(true);
  });

  it('[success] - getOrders', async () => {
    mockOrderService.getDetailOrder.mockResolvedValue(true);
    const result = await orderController.getDetailOrder(req, param);
    expect(result).toBe(true);
  });

  it('[success] - getStatus', async () => {
    mockOrderService.getStatus.mockResolvedValue(true);
    const result = await orderController.getStatus(req, param);
    expect(result).toBe(true);
  });
});
