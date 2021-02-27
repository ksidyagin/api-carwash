import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/modules/client/models/client.interface";

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
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    EXECUTOR = 'executor',
    MANAGER = 'manager'
}