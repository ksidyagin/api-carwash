import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { ActOfDebiting } from '../../models/act-of-debiting.model';
import { ActOfDebitingService } from '../../services/act-of-debiting/act-of-debiting.service';

@ApiTags('act-of-debiting')
@Controller('act-of-debiting')
export class ActOfDebitingController {

    constructor(private actDebitingService: ActOfDebitingService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()act: ActOfDebiting): Observable<ActOfDebiting> 
    {
        return this.actDebitingService.create(act);
    }

    @Get()
    findAll(): Observable<ActOfDebiting[]> 
    {
        return this.actDebitingService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<ActOfDebiting> 
    {
        return this.actDebitingService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<ActOfDebiting> 
    {
        return this.actDebitingService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()act: ActOfDebiting): Observable<any>  
    {
        return this.actDebitingService.updateOne(Number(id), act);
    }
}
