import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()product: Product): Observable<Product> 
    {
        return this.productService.create(product);
    }

    @Get()
    findAll(): Observable<Product[]> 
    {
        return this.productService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Product> 
    {
        return this.productService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Product> 
    {
        return this.productService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()product: Product): Observable<any>  
    {
        return this.productService.updateOne(Number(id), product);
    }
}
