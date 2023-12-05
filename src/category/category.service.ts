import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/schemas/category.schema';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categorys = await this.categoryModel.find();
    return categorys;
  }

  async findById(id: string): Promise<Category> {
    const categorys = await this.categoryModel.findById(id);

    if (!categorys) {
      throw new NotFoundException('categorys not found.');
    }

    return categorys;
  }

  async create(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);
    return res;
  }

  async updateById(id: string, category: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }


  async deleteById(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new NotFoundException('Category not found.');
    }

    return deletedCategory;
  }
}
