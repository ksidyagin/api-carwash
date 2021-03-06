import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './controllers/warehouse/warehouse.controller';
import { WarehouseEntity } from './models/warehouse.entity';
import { WarehouseService } from './services/warehouse/warehouse.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([WarehouseEntity])
        
    ],
    providers:[WarehouseService],
    controllers:[WarehouseController],
    exports:[WarehouseService, TypeOrmModule]
})
export class WarehouseModule {}
