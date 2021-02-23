import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { Client } from '../../models/client.interface';
import { ClientService } from '../../services/client/client.service';

@Controller('clients')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()client: Client): Observable<Client> 
    {
        return this.clientService.create(client);
    }

    @Get()
    findAll(): Observable<Client[]> 
    {
        return this.clientService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Client> 
    {
        return this.clientService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Client> 
    {
        return this.clientService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()client: Client): Observable<any>  
    {
        return this.clientService.updateOne(Number(id), client);
    }
}
