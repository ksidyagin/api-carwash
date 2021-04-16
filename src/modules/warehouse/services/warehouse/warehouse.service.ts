import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { WarehouseEntity } from '../../models/warehouse.entity';
import { Warehouse } from '../../models/warehouse.model';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(WarehouseEntity) private readonly warehouseRepository: Repository<WarehouseEntity>
    ){}
  
    create(warehouse: Warehouse): Observable<Warehouse> 
    {
        return from(this.warehouseRepository.save(warehouse)); 
    }
  
  
    findOne(id: number): Observable<Warehouse> {
        return from(this.warehouseRepository.findOne({id}, {relations: ['products']}));
    }
  
    findAll(): Observable<Warehouse[]> 
    {
        return from(this.warehouseRepository.find({relations: ['products']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.warehouseRepository.delete(id));
    }
  
    updateOne(id: number, warehouse: Warehouse): Observable<any> 
    {
        return from(this.warehouseRepository.update(id, warehouse));
    }
}
