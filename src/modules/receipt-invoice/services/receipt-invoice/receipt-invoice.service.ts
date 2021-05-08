import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductEntity } from 'src/modules/product/models/product.entity';
import { Product } from 'src/modules/product/models/product.model';
import { Warehouse } from 'src/modules/warehouse/models/warehouse.model';
import { Repository } from 'typeorm';
import { ReceiptInvoiceEntity } from '../../models/receipt-invoice.entity';

@Injectable()
export class ReceiptInvoiceService {

    constructor( @InjectRepository(ReceiptInvoiceEntity) private readonly receiptInvoiceRepository: Repository<ReceiptInvoiceEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
    ){}
  
    create(receipt: ReceiptInvoiceEntity): Observable<ReceiptInvoiceEntity> 
    {
        const newProduct = new ProductEntity();
        newProduct.name = receipt.name_product;
        newProduct.measurement = receipt.packaging;
        newProduct.count = receipt.count;
        newProduct.warehouse = receipt.warehouse_entry;
        this.productRepository.save(newProduct);
        return from(this.receiptInvoiceRepository.save(receipt)); 
    }
  
  
    findOne(id: number): Observable<ReceiptInvoiceEntity> {
        return from(this.receiptInvoiceRepository.findOne({id}, {relations: ['warehouse_entry']}));
    }
  
    findAll(): Observable<ReceiptInvoiceEntity[]> 
    {
        return from(this.receiptInvoiceRepository.find({relations: ['warehouse_entry']}));
    }
  
    deleteOne(id: number): Observable<any> 
    {
        return from(this.receiptInvoiceRepository.delete(id));
    }
  
    updateOne(id: number, product: ReceiptInvoiceEntity): Observable<any> 
    {
        return from(this.receiptInvoiceRepository.update(id, product));
    }



}
