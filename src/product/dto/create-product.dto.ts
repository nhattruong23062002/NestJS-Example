import { IsString, IsNotEmpty, IsUrl, MinLength, IsMongoId, IsNumberString, IsNumber } from 'class-validator';
import { Category } from 'src/schemas/category.schema';
import { Supplier } from 'src/schemas/supplier.schema';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly discount: number;

  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly categoryId: string; // Giữ kiểu string ở đây

  @IsNotEmpty()
  @IsMongoId()
  readonly supplierId: string; // Giữ kiểu string ở đây
}
