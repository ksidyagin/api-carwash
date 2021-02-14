import { CarwashEntity } from "src/modules/carwash/models/carwash.entity";
import { ServiceEntity } from "src/modules/service/models/service.entity";
import { Service } from "src/modules/service/models/service.interface";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(type => ServiceEntity, service => service.category, { cascade: ['insert', 'update'] })
    services: ServiceEntity[];

    @ManyToOne(type => CarwashEntity, carwash => carwash.service_categories)
    carwash: CarwashEntity;

}