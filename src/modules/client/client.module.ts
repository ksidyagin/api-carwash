import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client/client.controller';
import { ClientEntity } from './models/client.entity';
import { ClientService } from './services/client/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity])
        
    ],
    providers:[ClientService],
    controllers:[ClientController],
    exports:[ClientService, TypeOrmModule]
})
export class ClientModule 
{}
