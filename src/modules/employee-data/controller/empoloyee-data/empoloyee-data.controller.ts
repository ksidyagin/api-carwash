import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { EmployeeData } from '../../models/employee-data.model';
import { EmployeeDataService } from '../../service/employee-data.service';

@ApiTags('employee-data')
@Controller('employee-data')
export class EmpoloyeeDataController {

    constructor(private employeeDataService: EmployeeDataService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()employee_data: EmployeeData): Observable<EmployeeData> 
    {
        return this.employeeDataService.create(employee_data);
    }

    @Get()
    findAll(): Observable<EmployeeData[]> 
    {
        return this.employeeDataService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<EmployeeData> 
    {
        return this.employeeDataService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<EmployeeData> 
    {
        return this.employeeDataService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()employee_data: EmployeeData): Observable<any>  
    {
        return this.employeeDataService.updateOne(Number(id), employee_data);
    }

}
