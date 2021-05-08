import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { ReceiptInvoice } from '../../models/receipt-invoice.model';
import { ReceiptInvoiceService } from '../../services/receipt-invoice/receipt-invoice.service';

@ApiTags('receipt-invoice')
@Controller('receipt-invoice')
export class ReceiptInvoiceController {

    constructor(private receiptService: ReceiptInvoiceService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()    
    @Post()
    create(@Body()receipt: ReceiptInvoice): Observable<ReceiptInvoice> 
    {
        return this.receiptService.create(receipt);
    }

    @Get()
    findAll(): Observable<ReceiptInvoice[]> 
    {
        return this.receiptService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<ReceiptInvoice> 
    {
        return this.receiptService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<ReceiptInvoice> 
    {
        return this.receiptService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    updateOne(@Param('id')id: string , @Body()warehouse: ReceiptInvoice): Observable<any>  
    {
        return this.receiptService.updateOne(Number(id), warehouse);
    }

}
