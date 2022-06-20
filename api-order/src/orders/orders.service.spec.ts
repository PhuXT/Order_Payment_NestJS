import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockCreateOrder,
  mockOrder,
  mockOrderId,
  mockUserId,
} from './orders.mock';
import { OrderRepository } from './orders.repository';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  const mockOrderRepository = {
    create: jest.fn(),
    update: jest.fn(),
    getDetailOrder: jest.fn(),
    getOrders: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrderRepository,
        {
          provide: 'PAYMENT_SERVICE',
          useValue: {},
        },
        {
          provide: getModelToken('UserModel'),
          useValue: {},
        },
      ],
    })
      .overrideProvider(OrderRepository)
      .useValue(mockOrderRepository)
      .compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return new order', async () => {
      mockOrderRepository.create.mockResolvedValue(mockOrder);
      const result = await service.create(mockUserId, mockCreateOrder);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('cancelOrder', () => {
    it('should return order cancellations', async () => {
      mockOrderRepository.getDetailOrder.mockResolvedValue(mockOrder);
      mockOrderRepository.update.mockResolvedValue(mockOrder);
      const result = await service.cancelOrder(mockUserId, mockOrderId);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getDetailOrder', () => {
    it('should return order detail', async () => {
      mockOrderRepository.getDetailOrder.mockResolvedValue(mockOrder);
      const result = await service.getDetailOrder(mockUserId, mockOrderId);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getStatus', () => {
    it('should return order detail', async () => {
      mockOrderRepository.getDetailOrder.mockResolvedValue(mockOrder);
      const result = await service.getStatus(mockUserId, mockOrderId);
      expect(result).toEqual(mockOrder.orderStatus);
    });
  });

  describe('getStatus', () => {
    it('should return status Order', async () => {
      mockOrderRepository.getDetailOrder.mockResolvedValue(mockOrder);
      const result = await service.getStatus(mockUserId, mockOrderId);
      expect(result).toEqual(mockOrder.orderStatus);
    });
  });

  describe('getStatus', () => {
    it('should return list Order', async () => {
      mockOrderRepository.getOrders.mockResolvedValue([mockOrder]);
      const result = await service.getOrders(mockUserId);
      expect(result).toEqual([mockOrder]);
    });
  });
});
