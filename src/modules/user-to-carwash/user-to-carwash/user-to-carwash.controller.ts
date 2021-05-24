import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { hasRoles } from 'src/modules/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { UserRole } from 'src/modules/user/models/user.interface';
import { UserToCarwash } from '../models/userToCarwash.model';
import { UserToCarwashService } from './user-to-carwash.service';

@ApiTags('user-to-carwash')
@Controller('user-to-carwash')
export class UserToCarwashController {
    constructor(private relationService: UserToCarwashService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()relation: UserToCarwash): Observable<UserToCarwash> 
    {
        return this.relationService.create(relation);
    }

    @Get()
    findAll(): Observable<UserToCarwash[]> 
    {
        return this.relationService.findAll();
    }
    @Get('selectCarwash/:id')
    findByCarwash(@Param('id') id: number): Observable<UserToCarwash[]> 
    {
        return this.relationService.findByCarwash(id);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<UserToCarwash> 
    {
        return this.relationService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<UserToCarwash> 
    {
        return this.relationService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()warehouse: UserToCarwash): Observable<any>  
    {
        return this.relationService.updateOne(Number(id), warehouse);
    }

}
