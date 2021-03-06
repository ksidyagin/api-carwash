import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { Service } from '../../models/service.interface';
import { ServiceService } from '../../services/service/service.service';

@ApiTags('services')
@Controller('services')
export class ServiceController 
{
    constructor(private servicesService: ServiceService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    create(@Body()service: Service): Observable<Service> 
    {
        return this.servicesService.create(service);
    }

    @Get()
    findAll(): Observable<Service[]> 
    {
        return this.servicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<Service> 
    {
        return this.servicesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Service> 
    {
        return this.servicesService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()service: Service): Observable<any>  
    {
        return this.servicesService.updateOne(Number(id), service);
    }
}
