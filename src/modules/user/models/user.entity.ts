import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { ClientEntity } from "src/modules/client/models/client.entity";
import { Client } from "src/modules/client/models/client.interface";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole, UserStatus } from "./user.interface";


@Entity()
export class UserEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;
    
    @ApiProperty()
    @Column()
    firstName?: string;

    @ApiProperty()
    @Column()
    lastName?: string;

    @ApiProperty()
    @Column()
    email?: string;

    @ApiProperty()
    @Column()
    password?: string;

    @ApiProperty()
    @Column()
    phone?: string;

    @ApiProperty()
    @Column()
    city?: string;    

    @ApiProperty({required: false})
    @Column({type: 'enum', enum: UserRole, default: UserRole.USER })
    role?: UserRole;

    @ApiProperty({required: false})
    @OneToOne(() => ClientEntity, client => client.user_entry, {cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE', eager: true})
    @JoinColumn()
    client_entry?: ClientEntity;
    
    @ApiProperty()
    @Column({type: 'enum', enum: UserStatus, default: UserStatus.pending })
    status?: UserStatus;
}