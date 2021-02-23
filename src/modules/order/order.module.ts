import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order/order.controller';
import { OrderEntity } from './models/order.entity';
import { OrderService } from './services/order/order.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity])
        
    ],
    providers:[OrderService],
    controllers:[OrderController],
    exports:[OrderService, TypeOrmModule]
})
export class OrderModule {}
