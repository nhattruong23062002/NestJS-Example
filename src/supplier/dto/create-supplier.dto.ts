import { IsString, IsNotEmpty, IsUrl, MinLength, IsEmail } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNotEmpty()
  readonly address: string;
}
