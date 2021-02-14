import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { Carwash } from '../../models/carwash.interface';
import { CarwashService } from '../../services/carwash/carwash.service';

@Controller('carwashes')
export class CarwashController 
{
    constructor(private carwashService: CarwashService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()carwash: Carwash): Observable<Carwash> 
    {
        return this.carwashService.create(carwash);
    }

    @Get()
    findAll(): Observable<Carwash[]> 
    {
        return this.carwashService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<Carwash> 
    {
        return this.carwashService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Carwash> 
    {
        return this.carwashService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()carwash: Carwash): Observable<any>  
    {
        return this.carwashService.updateOne(Number(id), carwash);
    }
}
