import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsDate, IsNotEmpty, ValidateIf,IsIn } from 'class-validator';

export const orderDetailSchema = new MongooseSchema({
    productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  });

@Schema({
  timestamps: true,
})


export class Order{
  @Prop()
  @IsNotEmpty()
  createdDate: Date;

  @Prop()
  @IsNotEmpty()
  shippedDate: Date;

  @Prop()
  @IsIn(['CASH', 'CREDIT CARD'])
  paymentType: string;

  @Prop()
  @IsIn(['WAITING', 'COMPLETED', 'CANCELED', 'DELIVERING'])
  status: string;

  @Prop()
  description: string;

  @Prop()
  shippingAddress: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer' })
  customerId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Employee' })
  employeeId: string;

  @Prop()
  @Prop({ type: [orderDetailSchema] })
  orderDetails: Record<string, any>[];

}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });
