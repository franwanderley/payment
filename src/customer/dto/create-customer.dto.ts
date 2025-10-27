import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  document: string;

  @IsNotEmpty()
  @MaxLength(15)
  phone: string;
}
