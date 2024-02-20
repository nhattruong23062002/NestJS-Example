import { IsString, IsNotEmpty, IsUrl, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsUrl()
  readonly image: string;
}