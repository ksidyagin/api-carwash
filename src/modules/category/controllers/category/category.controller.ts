import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category/category.service';

@ApiTags('categories')
@Controller('categories')
export class CategoryController 
{
    constructor(private categoryService: CategoryService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth()
    create(@Body()category: Category): Observable<Category> 
    {
        return this.categoryService.create(category);
    }

    @Get()
    findAll(): Observable<Category[]> 
    {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<Category> 
    {
        return this.categoryService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth()
    deleteOne(@Param('id')id: string): Observable<Category> 
    {
        return this.categoryService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBearerAuth()
    updateOne(@Param('id')id: string , @Body()category: Category): Observable<any>  
    {
        return this.categoryService.updateOne(Number(id), category);
    }
}
