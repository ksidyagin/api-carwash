import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../models/order.entity';
import { Order } from '../../models/order.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>
    ){}
  
    create(order: Order): Observable<Order> 
    {
        return from(this.orderRepository.save(order)); 
    }
  
  
    findOne(id: number): Observable<Order> {
        return from(this.orderRepository.findOne({id}, {relations: ['carwash_entry', 'client_entry', 'auto']}));
    }
  
    findAll(): Observable<Order[]> 
    {
        return from(this.orderRepository.find({relations: ['carwash_entry', 'client_entry', 'auto']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.orderRepository.delete(id));
    }
  
    updateOne(id: number, order: Order): Observable<any> 
    {
        return from(this.orderRepository.update(id, order));
    }

}
