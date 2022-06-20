import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BillDto } from './dto/bill.dto';
import { PaymentService } from './payment.service';
import { PAYMENT_STATUS_ENUM } from './payment_status.enum';

@Controller()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @MessagePattern('paymentStatus')
  responeStatus(bill: BillDto): PAYMENT_STATUS_ENUM {
    return this.paymentService.responePaymentStatus(bill);
  }
}
