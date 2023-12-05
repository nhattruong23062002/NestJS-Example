import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { Product } from 'src/schemas/product.schema';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().populate('categoryId').populate('supplierId');
    return products;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('product not found.');
    }

    return product;
  }

  async create(product: Product): Promise<Product> {
    const res = await this.productModel.create(product);
    return res;
  }

  async updateById(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  }


  async deleteById(id: string): Promise<Product> {
    const deleteProduct = await this.productModel.findByIdAndDelete(id);

    if (!deleteProduct) {
      throw new NotFoundException('Product not found.');
    }

    return deleteProduct;
  }
}
