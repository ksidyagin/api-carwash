import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { ActOfDebitingController } from './controllers/act-of-debiting/act-of-debiting.controller';
import { ActOfDebitingEntity } from './models/act-of-debiting.entity';
import { ActOfDebitingService } from './services/act-of-debiting/act-of-debiting.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ActOfDebitingEntity]),
        forwardRef(() => ProductModule)
    ],
    providers:[ActOfDebitingService],
    controllers:[ActOfDebitingController],
    exports:[ActOfDebitingService, TypeOrmModule]
})
export class ActOfDebitingModule {}
