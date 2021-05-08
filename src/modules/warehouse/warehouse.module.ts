import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActOfDebitingModule } from '../act-of-debiting/act-of-debiting.module';
import { InternalDisplacementModule } from '../internal-displacement/internal-displacement.module';
import { ReceiptInvoiceModule } from '../receipt-invoice/receipt-invoice.module';
import { WarehouseController } from './controllers/warehouse/warehouse.controller';
import { WarehouseEntity } from './models/warehouse.entity';
import { WarehouseService } from './services/warehouse/warehouse.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([WarehouseEntity]),
        forwardRef(()=> ReceiptInvoiceModule),
        forwardRef(()=> ActOfDebitingModule),
        forwardRef(()=> InternalDisplacementModule)

    ],
    providers:[WarehouseService],
    controllers:[WarehouseController],
    exports:[WarehouseService, TypeOrmModule]
})
export class WarehouseModule {}
