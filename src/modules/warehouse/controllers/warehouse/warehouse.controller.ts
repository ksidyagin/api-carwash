import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { Warehouse } from '../../models/warehouse.model';
import { WarehouseService } from '../../services/warehouse/warehouse.service';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehouseController {
    constructor(private warehouseService: WarehouseService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()warehouse: Warehouse): Observable<Warehouse> 
    {
        return this.warehouseService.create(warehouse);
    }

    @Get()
    findAll(): Observable<Warehouse[]> 
    {
        return this.warehouseService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Warehouse> 
    {
        return this.warehouseService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Warehouse> 
    {
        return this.warehouseService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()warehouse: Warehouse): Observable<any>  
    {
        return this.warehouseService.updateOne(Number(id), warehouse);
    }
}
