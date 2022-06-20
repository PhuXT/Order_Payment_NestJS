import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PAYMENT_STATUS_ENUM } from './payment_status.enum';

describe('PaymentController', () => {
  let paymentController: PaymentController;

  const mockPaymentService = {
    responePaymentStatus: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    })
      .overrideProvider(PaymentService)
      .useValue(mockPaymentService)
      .compile();

    paymentController = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(paymentController).toBeDefined();
  });

  it('[success] - responseStatus', async () => {
    mockPaymentService.responePaymentStatus.mockResolvedValue(
      PAYMENT_STATUS_ENUM.CONFIRMED,
    );
    const result = await paymentController.responeStatus({
      token: '123',
      totalPrice: 567,
    });
    expect(result).toEqual(PAYMENT_STATUS_ENUM.CONFIRMED);
  });
});
