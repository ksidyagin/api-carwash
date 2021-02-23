import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../models/client.entity';
import { Client } from '../../models/client.interface';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>
        ){}
  
  
    create(client: Client): Observable<Client> 
    {
        return from(this.clientRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<Client> {
        return from(this.clientRepository.findOne({id}));
    }
  
    findAll(): Observable<Client[]> 
    {
        return from(this.clientRepository.find({relations: ['cars']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.clientRepository.delete(id));
    }
  
    updateOne(id: number, client: Client): Observable<any> 
    {
        return from(this.clientRepository.update(id, client));
    }

}
