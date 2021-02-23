import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { ClientAuto } from '../../models/client-auto.interface';
import { ClientAutoService } from '../../services/client-auto/client-auto.service';

@Controller('clients-cars')
export class ClientAutoController {
    constructor(private clientAutoService: ClientAutoService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()clientAuto: ClientAuto): Observable<ClientAuto> 
    {
        return this.clientAutoService.create(clientAuto);
    }

    @Get()
    findAll(): Observable<ClientAuto[]> 
    {
        return this.clientAutoService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<ClientAuto> 
    {
        return this.clientAutoService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<ClientAuto> 
    {
        return this.clientAutoService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()clientAuto: ClientAuto): Observable<any>  
    {
        return this.clientAutoService.updateOne(Number(id), clientAuto);
    }
}
