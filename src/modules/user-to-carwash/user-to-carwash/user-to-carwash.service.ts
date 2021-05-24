import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserToCarwash } from '../models/userToCarwash.model';
import { UserToCarwashEntity } from '../models/user_to_carwash.entity';

@Injectable()
export class UserToCarwashService {

    constructor(
        @InjectRepository(UserToCarwashEntity) private readonly relationRepository: Repository<UserToCarwashEntity>
    ){}
  

    create(relation: UserToCarwash): Observable<UserToCarwash> 
    {
        return from(this.relationRepository.save(relation)); 
    }
  
  
    findOne(id: number): Observable<UserToCarwash> {
        return from(this.relationRepository.findOne(id));
    }
  
    findAll(): Observable<UserToCarwash[]> 
    {
        return from(this.relationRepository.find());
    }
  
    findByCarwash(id: number): Observable<UserToCarwash[]> 
    {
        return from(this.relationRepository.find({ where: { carwashId: id } }));
    }

    deleteOne(id: number): Observable<any> 
    {
        return from(this.relationRepository.delete(id));
    }
  
    updateOne(id: number, relation: UserToCarwash): Observable<any> 
    {
        return from(this.relationRepository.update(id, relation));
    }
  

}
