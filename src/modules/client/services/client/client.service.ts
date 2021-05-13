import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientAutoEntity } from 'src/modules/client-auto/models/client-auto.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../models/client.entity';
import { Client } from '../../models/client.interface';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>,
        @InjectRepository(ClientAutoEntity) private readonly clientAutoRepository: Repository<ClientAutoEntity>
        ){}
  
  
    create(client: Client): Observable<Client> 
    {
        return from(this.clientRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<Client> {
        return from(this.clientRepository.findOne({id}, {relations: ['cars', 'user_entry']}));
    }
  
    findAll(): Observable<Client[]> 
    {
        return from(this.clientRepository.find({relations: ['cars', 'user_entry']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
       return from(this.clientRepository.findOne({id}, {relations: ['cars']})).pipe(
           map((client: Client) => {
               if(client){
                   for(let i =0; i< client.cars.length; i++){
                    this.clientAutoRepository.delete(client.cars[i].id);
                   }
                   return from(this.clientRepository.delete(id));
               }
               else{
                throw new HttpException("This user is not exists", HttpStatus.BAD_REQUEST);
               }
           })
       )
    }
  
    updateOne(id: number, client: Client): Observable<any> 
    {
        return from(this.clientRepository.update(id, client));
    }

}
