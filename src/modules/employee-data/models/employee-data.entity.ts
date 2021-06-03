import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeeDataEntity {

    @PrimaryGeneratedColumn()
    id?: number;
   
    @Column()
    worker_id?: number;

    @Column()
    salary: number;

    @Column()
    bet: string;

   
}