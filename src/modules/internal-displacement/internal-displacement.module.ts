import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { InternalDisplacementController } from './controllers/internal-displacement/internal-displacement.controller';
import { InternalDisplacementEntity } from './models/internal-displacement.entity';
import { InternalDisplacementService } from './services/internal-displacement/internal-displacement.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([InternalDisplacementEntity]),
        forwardRef(() => ProductModule)
    ],
    providers:[InternalDisplacementService],
    controllers:[InternalDisplacementController],
    exports:[InternalDisplacementService, TypeOrmModule]
})
export class InternalDisplacementModule {}
