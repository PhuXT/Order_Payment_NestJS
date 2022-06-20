import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

type item = {
  productID: string;
  productName: string;
  productPrice: number;
  quantity: number;
};
export class OrderCreateDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  products: item[];

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  totalPrice: number;
}
