import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductEntity } from 'src/modules/product/models/product.entity';
import { Product } from 'src/modules/product/models/product.model';
import { Warehouse } from 'src/modules/warehouse/models/warehouse.model';
import { Repository } from 'typeorm';
import { ActOfDebitingEntity } from '../../models/act-of-debiting.entity';
import { ActOfDebiting } from '../../models/act-of-debiting.model';

@Injectable()
export class ActOfDebitingService {

    constructor( @InjectRepository(ActOfDebitingEntity) private readonly actOfdebitingRepository: Repository<ActOfDebitingEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
    ){}
  
    create(actDebiting: ActOfDebiting): Observable<ActOfDebiting> 
    {
        const countProd: number = actDebiting.count;
        const nameProd: string = actDebiting.name_product;
        const warehouseProd: Warehouse = actDebiting.warehouse_deleted;
        return from(this.productRepository.findOne({where: {name: nameProd, warehouse: warehouseProd}})).pipe(
            switchMap((prod: Product) => {
                prod.count = prod.count - countProd;
                if(prod.count < 0){
                    prod.count = 0;
                } 
                this.productRepository.update(prod.id, prod);
                return from(this.actOfdebitingRepository.save(actDebiting)); 
            })
        )
    }
  
  
    findOne(id: number): Observable<ActOfDebiting> {
        return from(this.actOfdebitingRepository.findOne({id},{relations: ['warehouse_deleted']}));
    }
  
    findAll(): Observable<ActOfDebiting[]> 
    {
        return from(this.actOfdebitingRepository.find({relations: ['warehouse_deleted']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.actOfdebitingRepository.delete(id));
    }
  
    updateOne(id: number, product: ActOfDebiting): Observable<any> 
    {
        return from(this.actOfdebitingRepository.update(id, product));
    }


}
