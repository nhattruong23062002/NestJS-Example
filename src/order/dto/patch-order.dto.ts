import { IsString, IsNotEmpty, IsOptional, IsIn, IsMongoId, ArrayMinSize, IsNumber,ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';


class CreateOrderDetailDto {
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  readonly productId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}


export class PatchOrderDto {
  @IsOptional()
  @IsNotEmpty()
  readonly createdDate: Date;

  @IsOptional()
  @IsNotEmpty()
  readonly shippedDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(['CASH', 'CREDIT CARD'])
  readonly paymentType: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(['WAITING', 'COMPLETED', 'CANCELED', 'DELIVERING'])
  readonly status: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly shippingAddress: string;

  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  readonly customerId: string; // Giữ kiểu string ở đây

  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  readonly employeeId: string; // Giữ kiểu string ở đây
  
  @IsOptional()
  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'At least one order detail is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  readonly orderDetails: CreateOrderDetailDto[];

}
