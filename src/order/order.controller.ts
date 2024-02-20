import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Patch,
    ValidationPipe,
  } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { Product } from 'src/schemas/product.schema';
import { OrderService } from './order.service';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { PatchOrderDto } from './dto/patch-order.dto';
  
    @Controller('order')
    export class OrderController {
      constructor(private orderService: OrderService) {}
    
      @Get()
      async getAllOrder(): Promise<ResponseData<Order[]>> {
        try {
          const orders = await this.orderService.findAll();
          return new ResponseData<Order[]>(200, 'Get All success',orders);     
        } catch (error) {
          return new ResponseData<Order[]>(404, 'Server Internal Error',null);  
        }
      }
    
      
      @Get(':id')
      async getOrder(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Order>> {
        try {
          const order= await this.orderService.findById(id);
          return new ResponseData<Order>(200, 'Get Detail success',order);     
        } catch (error) {
          return new ResponseData<Order>(404, 'Server Internal Error',null);  
        }
      }
  
      @Post()
      async createOrder(
        @Body(new ValidationPipe())
        order: CreateOrderDto,
      ): Promise<ResponseData<Order>> {
        try {
          const newOrder = await this.orderService.create(order);
          return new ResponseData<Order>(200, 'Create success', newOrder);     
        } catch (error) {
          console.log('««««« error »»»»»', error);
          return new ResponseData<Order>(404, 'Server Internal Error',null);  
        }
      }  
  
      @Put(':id')
      async updateOrder(
        @Param('id')
        id: string,
        @Body()
        order: CreateOrderDto,
      ):  Promise<ResponseData<Order>> {
        try {
          const orderUpdate = await this.orderService.updateById(id, order);
          return new ResponseData<Order>(200, 'Update success', orderUpdate);     
        } catch (error) {
          return new ResponseData<Order>(404, 'Server Internal Error',null);  
        }
      }

      @Patch(':id')
      async patchOrder(
        @Param('id')
        id: string,
        @Body()
        order: PatchOrderDto,
      ):  Promise<ResponseData<Order>> {
        try {
          const orderUpdate = await this.orderService.updateById(id, order);
          return new ResponseData<Order>(200, 'Update success', orderUpdate);     
        } catch (error) {
          return new ResponseData<Order>(404, 'Server Internal Error',null);  
        }
      }
  
      @Delete(':id')
      async deleteOrder(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Order>> {
        try {
          const orderDelete = await this.orderService.deleteById(id);
          return new ResponseData<Order>(200, 'Delete success', orderDelete);     
        } catch (error) {
          return new ResponseData<Order>(404, 'Server Internal Error',null);  
        }
      }
    
    }
    