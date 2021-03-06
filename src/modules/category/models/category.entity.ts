import { ApiProperty } from "@nestjs/swagger";
import { CarwashEntity } from "src/modules/carwash/models/carwash.entity";
import { ServiceEntity } from "src/modules/service/models/service.entity";
import { Service } from "src/modules/service/models/service.interface";
import { WarehouseEntity } from "src/modules/warehouse/models/warehouse.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CategoryEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;
    
    @ApiProperty()
    @Column()
    name?: string;

    @ApiProperty({required: false})
    @OneToMany(() => ServiceEntity, service => service.category, { cascade: ['insert', 'update'] })
    services?: ServiceEntity[];

    @ApiProperty({required: false})
    @OneToMany(() => WarehouseEntity, warehouse => warehouse.service_category)
    warehouses?: WarehouseEntity[];

    @ApiProperty()
    @ManyToOne(() => CarwashEntity, carwash => carwash.service_categories)
    carwash?: CarwashEntity;

}