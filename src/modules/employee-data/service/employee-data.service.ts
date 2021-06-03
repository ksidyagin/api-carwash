import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { EmployeeDataEntity } from '../models/employee-data.entity';
import { EmployeeData } from '../models/employee-data.model';

@Injectable()
export class EmployeeDataService {

    constructor(
        @InjectRepository(EmployeeDataEntity) private readonly orderRepository: Repository<EmployeeDataEntity>
    ){}
  
    create(employee_data: EmployeeData): Observable<EmployeeData> 
    {
        return from(this.orderRepository.save(employee_data)); 
    }
  
  
    findOne(id: number): Observable<EmployeeData> {
        return from(this.orderRepository.findOne(id));
    }
  
    findAll(): Observable<EmployeeData[]> 
    {
        return from(this.orderRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.orderRepository.delete(id));
    }
  
    updateOne(id: number, employee_data: EmployeeData): Observable<any> 
    {
        return from(this.orderRepository.update(id, employee_data));
    }

}
