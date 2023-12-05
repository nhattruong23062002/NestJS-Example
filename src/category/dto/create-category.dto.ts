import { IsString, IsNotEmpty, IsUrl, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}