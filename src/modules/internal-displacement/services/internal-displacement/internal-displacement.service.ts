import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductEntity } from 'src/modules/product/models/product.entity';
import { Product } from 'src/modules/product/models/product.model';
import { Warehouse } from 'src/modules/warehouse/models/warehouse.model';
import { Repository } from 'typeorm';
import { InternalDisplacementEntity } from '../../models/internal-displacement.entity';

@Injectable()
export class InternalDisplacementService {

 constructor( @InjectRepository(InternalDisplacementEntity) private readonly displacementRepository: Repository<InternalDisplacementEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
    ){}
  
    create(displacement: InternalDisplacementEntity): Observable<InternalDisplacementEntity> 
    {
        const countProd: number = displacement.count;
        const nameProd: string = displacement.name_product;
        const warehouseProd: Warehouse = displacement.warehouse_added;
        return from(this.productRepository.findOne({where: {name: nameProd, warehouse: displacement.warehouse_deleted}})).pipe(
            switchMap((prod: Product) => {
                prod.count = prod.count - countProd;
                if(prod.count <= 0){
                    prod.count = 0;
                }
                this.productRepository.update(prod.id, prod);
                const newProd: ProductEntity = {
                    id: 0,
                    name: nameProd,
                    count: countProd,
                    warehouse: warehouseProd,
                    measurement: prod.measurement
                }
                this.productRepository.save(newProd);
                return from(this.displacementRepository.save(displacement)); 
            })
        )
    }
  
  
    findOne(id: number): Observable<InternalDisplacementEntity> {
        return from(this.displacementRepository.findOne({id}, {relations: ['warehouse_added']}));
    }
  
    findAll(): Observable<InternalDisplacementEntity[]> 
    {
        return from(this.displacementRepository.find({relations: ['warehouse_added']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.displacementRepository.delete(id));
    }
  
    updateOne(id: number, product: InternalDisplacementEntity): Observable<any> 
    {
        return from(this.displacementRepository.update(id, product));
    }


}
