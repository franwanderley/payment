import { IsNotEmpty, IsString } from 'class-validator';

export class InstantPayDto {
  @IsNotEmpty()
  @IsString()
  instantKey: string;
}
