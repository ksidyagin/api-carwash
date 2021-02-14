import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.interface";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    city: string;    

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({default: 0 })
    visits: number;

}