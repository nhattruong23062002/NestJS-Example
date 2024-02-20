import { IsString, IsNotEmpty, ValidateIf, IsIn, IsMongoId, ArrayMinSize, IsNumber,ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';


class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}


export class CreateOrderDto {
  @IsNotEmpty()
  readonly createdDate: Date;

  @IsNotEmpty()
  readonly shippedDate: Date;;

  @IsNotEmpty()
  @IsIn(['CASH', 'CREDIT CARD'])
  readonly paymentType: string;


  @IsNotEmpty()
  @IsIn(['WAITING', 'COMPLETED', 'CANCELED', 'DELIVERING'])
  readonly status: string;


  readonly description: string;

  readonly shippingAddress: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly customerId: string; // Giữ kiểu string ở đây

  @IsNotEmpty()
  @IsMongoId()
  readonly employeeId: string; // Giữ kiểu string ở đây

  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'At least one order detail is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  readonly orderDetails: CreateOrderDetailDto[];

}
