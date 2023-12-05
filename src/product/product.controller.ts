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
import { ProductService } from './product.service';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
  
    @Controller('products')
    export class ProductController {
      constructor(private productService: ProductService) {}
    
      @Get()
      async getAllProduct(): Promise<ResponseData<Product[]>> {
        try {
          const products = await this.productService.findAll();
          return new ResponseData<Product[]>(200, 'Get All success',products);     
        } catch (error) {
          return new ResponseData<Product[]>(404, 'Server Internal Error',null);  
        }
      }
    
      
      @Get(':id')
      async getProduct(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Product>> {
        try {
          const product= await this.productService.findById(id);
          return new ResponseData<Product>(200, 'Get Detail success',product);     
        } catch (error) {
          return new ResponseData<Product>(404, 'Server Internal Error',null);  
        }
      }
  
      @Post()
      async createProduct(
        @Body(new ValidationPipe())
        product: CreateProductDto,
      ): Promise<ResponseData<Product>> {
        try {
          const newProduct = await this.productService.create(product);
          return new ResponseData<Product>(200, 'Create success', newProduct);     
        } catch (error) {
          return new ResponseData<Product>(404, 'Server Internal Error',null);  
        }
      }  
  
      @Put(':id')
      async updateProduct(
        @Param('id')
        id: string,
        @Body()
        product: CreateProductDto,
      ):  Promise<ResponseData<Product>> {
        try {
          const productUpdate = await this.productService.updateById(id, product);
          return new ResponseData<Product>(200, 'Update success', productUpdate);     
        } catch (error) {
          return new ResponseData<Product>(404, 'Server Internal Error',null);  
        }
      }
  
      @Delete(':id')
      async deleteProduct(
        @Param('id')
        id: string,
      ): Promise<ResponseData<Product>> {
        try {
          const productDelete = await this.productService.deleteById(id);
          return new ResponseData<Product>(200, 'Delete success', productDelete);     
        } catch (error) {
          return new ResponseData<Product>(404, 'Server Internal Error',null);  
        }
      }
    
    }
    