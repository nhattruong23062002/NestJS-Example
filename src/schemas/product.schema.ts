import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.schema';
import { Supplier } from './supplier.schema';

@Schema({
  timestamps: true,
})
export class Product{
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  discount: number;

  @Prop()
  stock: number;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  categoryId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplierId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
