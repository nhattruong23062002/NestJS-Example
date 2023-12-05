import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Supplier } from 'src/schemas/supplier.schema';


@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name)
    private supplierModel: mongoose.Model<Supplier>,
  ) {}

  async findAll(): Promise<Supplier[]> {
    const suppliers = await this.supplierModel.find();
    return suppliers;
  }

  async findById(id: string): Promise<Supplier> {
    const suppliers = await this.supplierModel.findById(id);

    if (!suppliers) {
      throw new NotFoundException('suppliers not found.');
    }

    return suppliers;
  }

  async create(supplier: Supplier): Promise<Supplier> {
    const res = await this.supplierModel.create(supplier);
    return res;
  }

  async updateById(id: string, supplier: Supplier): Promise<Supplier> {
    return await this.supplierModel.findByIdAndUpdate(id, supplier, {
      new: true,
      runValidators: true,
    });
  }


  async deleteById(id: string): Promise<Supplier> {
    const deleteSupplier = await this.supplierModel.findByIdAndDelete(id);

    if (!deleteSupplier) {
      throw new NotFoundException('Supplier not found.');
    }

    return deleteSupplier;
  }
}
