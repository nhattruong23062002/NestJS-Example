import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: true,
})
export class Supplier {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);


