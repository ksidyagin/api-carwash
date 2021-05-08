import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { ReceiptInvoiceEntity } from 'src/modules/receipt-invoice/models/receipt-invoice.entity';
import { Repository } from 'typeorm';
import { WarehouseEntity } from '../../models/warehouse.entity';
import { Warehouse } from '../../models/warehouse.model';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(WarehouseEntity) private readonly warehouseRepository: Repository<WarehouseEntity>,
        @InjectRepository(ReceiptInvoiceEntity) private readonly receiptRepos: Repository<ReceiptInvoiceEntity>
    ){}
  
    create(warehouse: Warehouse): Observable<Warehouse> 
    {
        return from(this.warehouseRepository.save(warehouse)); 
    }
  
  
    findOne(id: number): Observable<Warehouse> {
        return from(this.warehouseRepository.findOne({id}, {relations: ['products', 'service_category']}));
    }
  
    findAll(): Observable<Warehouse[]> 
    {
        return from(this.warehouseRepository.find({relations: ['products', 'service_category']}));
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
