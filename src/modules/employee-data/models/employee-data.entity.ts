import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeeDataEntity {

    @PrimaryGeneratedColumn()
    id?: number;
   
    @Column()
    worker_id?: number;

    @Column()
    worker_name?: string;

    @Column()
    salary_day?: number;

    @Column()
    salary_night?: number;

    @Column()
    bet?: string;

   
}