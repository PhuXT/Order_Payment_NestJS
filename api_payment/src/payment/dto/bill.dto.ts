import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BillDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  totalPrice: number;
}
