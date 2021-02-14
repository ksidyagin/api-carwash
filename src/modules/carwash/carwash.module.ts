import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { CarwashController } from './controllers/carwash/carwash.controller';
import { CarwashEntity } from './models/carwash.entity';
import { CarwashService } from './services/carwash/carwash.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([CarwashEntity])
        
    ],
    providers:[CarwashService],
    controllers:[CarwashController],
    exports:[CarwashService, TypeOrmModule]
})
export class CarwashModule {}
