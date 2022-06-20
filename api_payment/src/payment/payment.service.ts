import { ForbiddenException, Injectable } from '@nestjs/common';
import { BillDto } from './dto/bill.dto';
import { PAYMENT_STATUS_ENUM } from './payment_status.enum';

@Injectable()
export class PaymentService {
  responePaymentStatus(bill: BillDto): PAYMENT_STATUS_ENUM {
    if (bill.token !== process.env.TOKEN_PAYMENT) {
      throw new ForbiddenException();
    }
    const randomIndex = Math.round(Math.random());
    const arr = [PAYMENT_STATUS_ENUM.CONFIRMED, PAYMENT_STATUS_ENUM.DECLINED];
    return arr[randomIndex];
  }
}
