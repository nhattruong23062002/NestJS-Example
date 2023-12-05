import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseData } from 'src/global/globalClass';
import { AuthGuard } from '@nestjs/passport';

  @Controller('category')
  export class CategoryController {
    constructor(private categoryService: CategoryService) {}
  
    @Get()
    @UseGuards(AuthGuard())
    async getAllCategory(): Promise<ResponseData<Category[]>> {
      try {
        const categories = await this.categoryService.findAll();
        return new ResponseData<Category[]>(200, 'Get All success',categories);     
      } catch (error) {
        return new ResponseData<Category[]>(404, 'Server Internal Error',null);  
      }
    }
  
    
    @Get(':id')
    async getDetailCategory(
      @Param('id')
      id: string,
    ): Promise<ResponseData<Category>> {
      try {
        const category= await this.categoryService.findById(id);
        return new ResponseData<Category>(200, 'Get Detail success',category);     
      } catch (error) {
        return new ResponseData<Category>(404, 'Server Internal Error',null);  
      }
    }

    @Post()
    async createCategory(
      @Body(new ValidationPipe())
      category: CreateCategoryDto,
    ): Promise<ResponseData<Category>> {
      try {
        const categoryAdd = await this.categoryService.create(category);
        return new ResponseData<Category>(200, 'Create success', categoryAdd);     
      } catch (error) {
        return new ResponseData<Category>(404, 'Server Internal Error',null);  
      }
    }  

    @Put(':id')
    async updateCategory(
      @Param('id')
      id: string,
      @Body()
      category: CreateCategoryDto,
    ):  Promise<ResponseData<Category>> {
      try {
        const categoryUpdate = await this.categoryService.updateById(id, category);
        return new ResponseData<Category>(200, 'Update success', categoryUpdate);     
      } catch (error) {
        return new ResponseData<Category>(404, 'Server Internal Error',null);  
      }
    }

    @Delete(':id')
    async deleteCategory(
      @Param('id')
      id: string,
    ): Promise<ResponseData<Category>> {
      try {
        const categoryDelete = await this.categoryService.deleteById(id);
        return new ResponseData<Category>(200, 'Delete success', categoryDelete);     
      } catch (error) {
        return new ResponseData<Category>(404, 'Server Internal Error',null);  
      }
    }
  
  }
  