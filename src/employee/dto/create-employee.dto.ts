import { IsString, IsNotEmpty, IsUrl, MinLength, IsEmail, IsPhoneNumber, IsDate, IsDateString, Validate } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('VN', { message: 'Invalid Vietnamese phone number' })
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  readonly birthday: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  readonly password: string;

}

