import { ClientEntity } from "src/modules/client/models/client.entity";
import { Client } from "src/modules/client/models/client.interface";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToOne(() => ClientEntity, client => client.user_entry)
    client_entry: ClientEntity;
   
}