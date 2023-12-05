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
import { EmployeeService } from './employee.service';
import { Employee } from 'src/schemas/employee.schema';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
  
    @Controller('employee')
    export class EmployeeController {
      constructor(private employeeService: EmployeeService) {}
    
      @Get()
      async getAllEmployee(): Promise<ResponseData<Employee[]>> {
        try {
          const employees = await this.employeeService.findAll();
          return new ResponseData<Employee[]>(200, 'Get All success',employees);     
        } catch (error) {
          return new ResponseData<Employee[]>(404, 'Server Internal Error',null);  
        }
      }
    
      
      @Get(':id')
      async getDetailEmployee(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Employee>> {
        try {
          const employee= await this.employeeService.findById(id);
          return new ResponseData<Employee>(200, 'Get Detail success',employee);     
        } catch (error) {
          return new ResponseData<Employee>(404, 'Server Internal Error',null);  
        }
      }
  
      @Post()
      async createEmployee(
        @Body()
        employee: CreateCustomerDto,
      ): Promise<ResponseData<Employee>> {
        try {
          const newCustomer = await this.employeeService.create(employee);
          return new ResponseData<Employee>(200, 'Create success', newCustomer);     
        } catch (error) {
          return new ResponseData<Employee>(404, 'Server Internal Error',null);  
        }
      }  
  
      @Put(':id')
      async updateEmployee(
        @Param('id')
        id: string,
        @Body()
        employee: CreateCustomerDto,
      ):  Promise<ResponseData<Employee>> {
        try {
          const customerUpdate = await this.employeeService.updateById(id, employee);
          return new ResponseData<Employee>(200, 'Update success', customerUpdate);     
        } catch (error) {
          return new ResponseData<Employee>(404, 'Server Internal Error',null);  
        }
      }
  
      @Delete(':id')
      async deleteCustomer(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Employee>> {
        try {
          const customerDelete = await this.employeeService.deleteById(id);
          return new ResponseData<Employee>(200, 'Delete success', customerDelete);     
        } catch (error) {
          return new ResponseData<Employee>(404, 'Server Internal Error',null);  
        }
      }
    
    }
    