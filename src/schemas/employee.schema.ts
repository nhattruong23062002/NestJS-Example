import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: true,
})
export class Employee {
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

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
