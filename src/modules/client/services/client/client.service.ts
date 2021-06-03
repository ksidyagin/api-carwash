import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientAutoEntity } from 'src/modules/client-auto/models/client-auto.entity';
import { OrderEntity } from 'src/modules/order/models/order.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from '../../models/client.entity';
import { Client } from '../../models/client.interface';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>,
        @InjectRepository(ClientAutoEntity) private readonly clientAutoRepository: Repository<ClientAutoEntity>,
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>
        ){}
  
  
    create(client: Client): Observable<Client> 
    {
        return from(this.clientRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<Client> {
        return from(this.clientRepository.findOne({id}, {relations: ['cars']}));
    }
  
    findAll(): Observable<Client[]> 
    {
        return from(this.clientRepository.find({relations: ['cars']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
       return from(this.clientRepository.findOne({id}, {relations: ['cars', 'orders']})).pipe(
           map((client: Client) => {
               if(client){  
                   for(let i =0; i< client.cars.length; i++){
                    this.clientAutoRepository.delete(client.cars[i].id);
                   }
                   for(let i =0; i< client.orders.length; i++){
                    this.orderRepository.delete(client.orders[i].id);
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
