import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../models/product.entity';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
    ){}
  
    create(product: Product): Observable<Product> 
    {
        return from(this.productRepository.save(product)); 
    }
  
  
    findOne(id: number): Observable<Product> {
        return from(this.productRepository.findOne({id},{relations: ['warehouse']}));
    }
  
    findAll(): Observable<Product[]> 
    {
        return from(this.productRepository.find({relations: ['warehouse']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.productRepository.delete(id));
    }
  
    updateOne(id: number, product: Product): Observable<any> 
    {
        return from(this.productRepository.update(id, product));
    }
}
