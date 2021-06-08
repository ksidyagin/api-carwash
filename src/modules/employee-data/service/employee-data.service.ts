import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserEntity } from 'src/modules/user/models/user.entity';
import { User } from 'src/modules/user/models/user.interface';
import { Repository } from 'typeorm';
import { EmployeeDataEntity } from '../models/employee-data.entity';
import { EmployeeData } from '../models/employee-data.model';

@Injectable()
export class EmployeeDataService {

    constructor(
        @InjectRepository(EmployeeDataEntity) private readonly dataRepository: Repository<EmployeeDataEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ){}
  
    create(employee_data: EmployeeData): Observable<EmployeeData> 
    {
        return from(this.dataRepository.save(employee_data));
    }

  
    findOne(id: number): Observable<EmployeeData> {
        return from(this.dataRepository.findOne(id));
    }
  
    findAll(): Observable<EmployeeData[]> 
    {
        return from(this.dataRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.dataRepository.delete(id));
    }
  
    updateOne(id: number, employee_data: EmployeeData): Observable<any> 
    {
        return from(this.dataRepository.update(id, employee_data));
    }

}
