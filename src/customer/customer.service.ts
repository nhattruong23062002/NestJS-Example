import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/schemas/customer.schema';


@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerModel.find();
    return customers;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id);

    if (!customer) {
      throw new NotFoundException('customer not found.');
    }

    return customer;
  }

  async create(customer: Customer): Promise<Customer> {
    const res = await this.customerModel.create(customer);
    console.log('««««« res »»»»»', res);
    return res;
  }

  async updateById(id: string, customer: Customer): Promise<Customer> {
    return await this.customerModel.findByIdAndUpdate(id, customer, {
      new: true,
      runValidators: true,
    });
  }


  async deleteById(id: string): Promise<Customer> {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id);

    if (!deletedCustomer) {
      throw new NotFoundException('Customer not found.');
    }

    return deletedCustomer;
  }
}
