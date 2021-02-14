import { Injectable } from '@nestjs/common';
import { CarwashEntity } from '../../models/carwash.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { from, Observable, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import {switchMap, map, catchError} from 'rxjs/operators';
import { Carwash } from '../../models/carwash.interface';
@Injectable()
export class CarwashService {
    constructor(
        @InjectRepository(CarwashEntity) private readonly carwashRepository: Repository<CarwashEntity>
    ){}
  
  
    create(carwash: Carwash): Observable<Carwash> 
    {
        return from(this.carwashRepository.save(carwash)); 
    }
  
  
    findOne(id: number): Observable<Carwash> {
        return from(this.carwashRepository.findOne({id}, {relations: ['service_categories']}));
    }
  
    findAll(): Observable<Carwash[]> 
    {
        return from(this.carwashRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.carwashRepository.delete(id));
    }
  
    updateOne(id: number, carwash: Carwash): Observable<any> 
    {
        delete carwash.name;
        delete carwash.address;
        delete carwash.phone;
        delete carwash.workTime_weekday;
        delete carwash.workTime_weekend;
        delete carwash.rating;
        return from(this.carwashRepository.update(id, carwash));
    }
  
}
