import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { InternalDisplacement } from '../../models/internal-displacement.model';
import { InternalDisplacementService } from '../../services/internal-displacement/internal-displacement.service';

@ApiTags('internal-displacement')
@Controller('internal-displacement')
export class InternalDisplacementController {

    constructor(private displacementService: InternalDisplacementService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()displacement: InternalDisplacement): Observable<InternalDisplacement> 
    {
        return this.displacementService.create(displacement);
    }

    @Get()
    findAll(): Observable<InternalDisplacement[]> 
    {
        return this.displacementService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<InternalDisplacement> 
    {
        return this.displacementService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<InternalDisplacement> 
    {
        return this.displacementService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()displacement: InternalDisplacement): Observable<any>  
    {
        return this.displacementService.updateOne(Number(id), displacement);
    }
}
