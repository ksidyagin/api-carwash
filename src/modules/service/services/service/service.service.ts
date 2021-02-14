import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Category } from 'src/modules/category/models/category.interface';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../../models/service.entity';
import { Service } from '../../models/service.interface';

@Injectable()
export class ServiceService 
{
    constructor(
        @InjectRepository(ServiceEntity) private readonly carwashRepository: Repository<ServiceEntity>,
        private authService: AuthService
    ){}
  

    create(service: Service): Observable<Service> 
    {
        return from(this.carwashRepository.save(service)); 
    }
  
  
    findOne(id: number): Observable<Service> {
        return from(this.carwashRepository.findOne({id}, {relations: ['category']}));
    }
  
    findAll(): Observable<Service[]> 
    {
        return from(this.carwashRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.carwashRepository.delete(id));
    }
  
    updateOne(id: number, service: Service): Observable<any> 
    {
        delete service.description;
        delete service.price;
        return from(this.carwashRepository.update(id, service));
    }
  
}
