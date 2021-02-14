import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ServiceController } from './controllers/service/service.controller';
import { ServiceEntity } from './models/service.entity';
import { ServiceService } from './services/service/service.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ServiceEntity]),
        AuthModule
    ],
    providers:[ServiceService],
    controllers:[ServiceController],
    exports:[ServiceService]
})
export class ServiceModule {}
