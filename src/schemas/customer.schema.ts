import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: true,
})
export class Customer {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  birthday: Date;

  @Prop()
  password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
