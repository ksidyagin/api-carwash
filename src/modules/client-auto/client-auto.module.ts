import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientAutoController } from './controllers/client-auto/client-auto.controller';
import { ClientAutoEntity } from './models/client-auto.entity';
import { ClientAutoService } from './services/client-auto/client-auto.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientAutoEntity])
        
    ],
    providers:[ClientAutoService],
    controllers:[ClientAutoController],
    exports:[ClientAutoService, TypeOrmModule]
})
export class ClientAutoModule {}
