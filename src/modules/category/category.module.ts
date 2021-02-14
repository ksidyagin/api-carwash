import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from '../auth/auth.module';
import { CarwashModule } from '../carwash/carwash.module';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryEntity } from './models/category.entity';
import { CategoryService } from './services/category/category.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        AuthModule
    ],
    providers:[CategoryService],
    controllers:[CategoryController],
    exports:[CategoryService]
})
export class CategoryModule {
}
