import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierSchema } from 'src/schemas/supplier.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Supplier', schema: SupplierSchema}])],
  controllers: [SupplierController],
  providers: [SupplierService]
})
export class SupplierModule {}
