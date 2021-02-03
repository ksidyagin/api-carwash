
export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    city?: string; 
    role?: UserRole;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}