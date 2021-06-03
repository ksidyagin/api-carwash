import { ApiProperty } from "@nestjs/swagger";
import { Carwash } from "src/modules/carwash/models/carwash.interface";
import { Client } from "src/modules/client/models/client.interface";
import { UserToCarwash } from "../../user-to-carwash/models/userToCarwash.model";

export class User {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    firstName?: string;

    @ApiProperty()
    lastName?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    phone?: string;

    @ApiProperty()
    city?: string;

    @ApiProperty({required: false})
    role?: UserRole;

    @ApiProperty({required: false})
    client_entry?: Client;

    @ApiProperty()
    status?: UserStatus;

    // @ApiProperty({required: false, type: () => [UserToCarwash]})
    // userToCarwash?: UserToCarwash[];
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    EXECUTOR = 'executor',
    MANAGER = 'manager',
    SUPERADMIN = 'superadmin'
}

export enum UserStatus {
    blocked = 'blocked',
    pending = 'pending',
    active = 'active'
}