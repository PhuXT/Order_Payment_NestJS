import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// type user = {
//   userId: string;
//   email: string;
// };
export class user {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class reqLoinDto {
  @IsNotEmpty()
  @ApiProperty()
  user: user;
}
