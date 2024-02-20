import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/schemas/category.schema';
import { Order } from 'src/schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: mongoose.Model<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('order not found.');
    }

    return order;
  }

  async create(order: Order): Promise<Order> {
    const res = await this.orderModel.create(order);
    return res;
  }

  async updateById(id: string, order: Order): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
      runValidators: true,
    });
  }


  async deleteById(id: string): Promise<Order> {
    const deleteOrder = await this.orderModel.findByIdAndDelete(id);

    if (!deleteOrder) {
      throw new NotFoundException('Order not found.');
    }

    return deleteOrder;
  }
}
