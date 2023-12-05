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
import { SupplierService } from './supplier.service';
import { Supplier } from 'src/schemas/supplier.schema';
import { CreateSupplierDto } from './dto/create-supplier.dto';
  
    @Controller('supplier')
    export class SupplierController {
      constructor(private supplierService: SupplierService) {}
    
      @Get()
      async getAllSuppliers(): Promise<ResponseData<Supplier[]>> {
        try {
          const suppliers = await this.supplierService.findAll();
          return new ResponseData<Supplier[]>(200, 'Get All success',suppliers);     
        } catch (error) {
          return new ResponseData<Supplier[]>(404, 'Server Internal Error',null);  
        }
      }
    
      
      @Get(':id')
      async getSupplier(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Supplier>> {
        try {
          const supplier= await this.supplierService.findById(id);
          return new ResponseData<Supplier>(200, 'Get Detail success',supplier);     
        } catch (error) {
          return new ResponseData<Supplier>(404, 'Server Internal Error',null);  
        }
      }
  
      @Post()
      async createSupplier(
        @Body(new ValidationPipe())
        supplier: CreateSupplierDto,
      ): Promise<ResponseData<Supplier>> {
        try {
          console.log('««««« aaaa »»»»»');
          const supplierAdd = await this.supplierService.create(supplier);
          return new ResponseData<Supplier>(200, 'Create success', supplierAdd);     
        } catch (error) {
          return new ResponseData<Supplier>(404, 'Server Internal Error',null);  
        }
      }  
  
      @Put(':id')
      async updateSupplier(
        @Param('id')
        id: string,
        @Body()
        supplier: CreateSupplierDto,
      ):  Promise<ResponseData<Supplier>> {
        try {
          const supplierUpdate = await this.supplierService.updateById(id, supplier);
          return new ResponseData<Supplier>(200, 'Update success', supplierUpdate);     
        } catch (error) {
          return new ResponseData<Supplier>(404, 'Server Internal Error',null);  
        }
      }
  
      @Delete(':id')
      async deleteSupplier(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Supplier>> {
        try {
          const supplierDelete = await this.supplierService.deleteById(id);
          return new ResponseData<Supplier>(200, 'Delete success', supplierDelete);     
        } catch (error) {
          return new ResponseData<Supplier>(404, 'Server Internal Error',null);  
        }
      }
    
    }
    