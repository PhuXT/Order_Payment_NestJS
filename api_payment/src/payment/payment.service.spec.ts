import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('[success] - responeStatus', () => {
    const res = service.responePaymentStatus({
      token: '123',
      totalPrice: 12345,
    });
    expect(res).toBeDefined();
  });

  it('[exception] - responeStatus', () => {
    try {
      service.responePaymentStatus({ token: ``, totalPrice: 12345 });
    } catch (error) {
      expect(error.status).toEqual(403);
    }
  });
});
