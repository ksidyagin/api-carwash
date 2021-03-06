import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product/product.controller';
import { ProductEntity } from './models/product.entity';
import { ProductService } from './services/product/product.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity])
        
    ],
    providers:[ProductService],
    controllers:[ProductController],
    exports:[ProductService, TypeOrmModule]
})
export class ProductModule {}
