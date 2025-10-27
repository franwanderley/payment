import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do cliente',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Endereço de e-mail do cliente',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({
    example: '12345678900',
    description: 'CPF do cliente (apenas números)',
    minLength: 11,
    maxLength: 11,
  })
  document: string;

  @IsNotEmpty()
  @MaxLength(15)
  @ApiProperty({
    example: '5511987654321',
    description: 'Número de telefone do cliente',
    maxLength: 15,
  })
  phone: string;
}
