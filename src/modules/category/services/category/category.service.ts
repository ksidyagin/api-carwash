import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Carwash } from 'src/modules/carwash/models/carwash.interface';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../models/category.entity';
import { Category } from '../../models/category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
        private authService: AuthService
    ){}
  
  
    create(category: Category): Observable<Category> 
    {
        return from(this.categoryRepository.save(category)); 
    }
  
  
    findOne(id: number): Observable<Category> {
        return from(this.categoryRepository.findOne({id},  {relations: ['carwash', 'services', 'warehouses']}));
    }
  
    findAll(): Observable<Category[]> 
    {
        return from(this.categoryRepository.find({relations: ['carwash', 'services', 'warehouses']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.categoryRepository.delete(id));
    }
  
    updateOne(id: number, category: Category): Observable<any> 
    {
        delete category.name;
        return from(this.categoryRepository.update(id, category));
    }
}
