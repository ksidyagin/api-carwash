import { CarwashEntity } from "src/modules/carwash/models/carwash.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/models/user.entity";

@Entity()
export class UserToCarwashEntity {
    @PrimaryGeneratedColumn()
    public userToCarwashId?: number;

    @Column()
    public userId?: number;

    @Column()
    public carwashId?: number;

    // @ManyToOne(() => UserEntity, user => user.userToCarwash)
    // public user?: UserEntity;

    // @ManyToOne(() => CarwashEntity, carwash => carwash.userToCarwash)
    // public carwash?: CarwashEntity;
}