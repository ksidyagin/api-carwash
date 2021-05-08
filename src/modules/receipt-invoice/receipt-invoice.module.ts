import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { ReceiptInvoiceController } from './controllers/receipt-invoice/receipt-invoice.controller';
import { ReceiptInvoiceEntity } from './models/receipt-invoice.entity';
import { ReceiptInvoiceService } from './services/receipt-invoice/receipt-invoice.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReceiptInvoiceEntity]),
        forwardRef(() => ProductModule),
        forwardRef(() => WarehouseModule)
    ],
    providers:[ReceiptInvoiceService],
    controllers:[ReceiptInvoiceController],
    exports:[ReceiptInvoiceService, TypeOrmModule]
})
export class ReceiptInvoiceModule {}
