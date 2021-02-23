import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ClientAutoEntity } from '../../models/client-auto.entity';
import { ClientAuto } from '../../models/client-auto.interface';

@Injectable()
export class ClientAutoService {
    constructor(
        @InjectRepository(ClientAutoEntity) private readonly clientAutoRepository: Repository<ClientAutoEntity>
    ){}
  
    create(auto: ClientAuto): Observable<ClientAuto> 
    {
        return from(this.clientAutoRepository.save(auto)); 
    }
  
  
    findOne(id: number): Observable<ClientAuto> {
        return from(this.clientAutoRepository.findOne({id}));
    }
  
    findAll(): Observable<ClientAuto[]> 
    {
        return from(this.clientAutoRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.clientAutoRepository.delete(id));
    }
  
    updateOne(id: number, auto: ClientAuto): Observable<any> 
    {
        return from(this.clientAutoRepository.update(id, auto));
    }

}
