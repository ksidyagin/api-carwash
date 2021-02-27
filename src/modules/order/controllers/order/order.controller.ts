import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { Order } from '../../models/order.interface';
import { OrderService } from '../../services/order/order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()order: Order): Observable<Order> 
    {
        return this.orderService.create(order);
    }

    @Get()
    findAll(): Observable<Order[]> 
    {
        return this.orderService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Order> 
    {
        return this.orderService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Order> 
    {
        return this.orderService.deleteOne(Number(id));
    }

   
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()order: Order): Observable<any>  
    {
        return this.orderService.updateOne(Number(id), order);
    }
}
