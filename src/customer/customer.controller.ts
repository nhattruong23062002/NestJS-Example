import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    ValidationPipe,
  } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { CustomerService } from './customer.service';
import { Customer } from 'src/schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
  
    @Controller('customer')
    export class CustomerController {
      constructor(private customerService: CustomerService) {}
    
      @Get()
      async getAllCustomer(): Promise<ResponseData<Customer[]>> {
        try {
          const customers = await this.customerService.findAll();
          return new ResponseData<Customer[]>(200, 'Get All success',customers);     
        } catch (error) {
          return new ResponseData<Customer[]>(404, 'Server Internal Error',null);  
        }
      }
    
      
      @Get(':id')
      async getDetailCustomer(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Customer>> {
        try {
          const customer= await this.customerService.findById(id);
          return new ResponseData<Customer>(200, 'Get Detail success',customer);     
        } catch (error) {
          return new ResponseData<Customer>(404, 'Server Internal Error',null);  
        }
      }
  
      @Post()
      async createCustomer(
        @Body()
        customer: CreateCustomerDto,
      ): Promise<ResponseData<Customer>> {
        try {
          console.log('««««« customer »»»»»', customer);
          const newCustomer = await this.customerService.create(customer);
          console.log('««««« newCustomer »»»»»', newCustomer);
          return new ResponseData<Customer>(200, 'Create success', newCustomer);     
        } catch (error) {
          console.error('Error creating customer:', error);
          return new ResponseData<Customer>(404, 'Server Internal Error',null);  
        }
      }  
  
      @Put(':id')
      async updateCustomer(
        @Param('id')
        id: string,
        @Body()
        customer: CreateCustomerDto,
      ):  Promise<ResponseData<Customer>> {
        try {
          const customerUpdate = await this.customerService.updateById(id, customer);
          return new ResponseData<Customer>(200, 'Update success', customerUpdate);     
        } catch (error) {
          return new ResponseData<Customer>(404, 'Server Internal Error',null);  
        }
      }
  
      @Delete(':id')
      async deleteCustomer(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Customer>> {
        try {
          const customerDelete = await this.customerService.deleteById(id);
          return new ResponseData<Customer>(200, 'Delete success', customerDelete);     
        } catch (error) {
          return new ResponseData<Customer>(404, 'Server Internal Error',null);  
        }
      }
    
    }
    