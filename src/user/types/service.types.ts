import { CustomerEntity } from "../../customer/entities/customer.entity";
import { RoleType } from "../dto/user.dto";

export interface ReadServiceOpts {
    selectPassword: boolean;
}

export interface UserObject {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password?: string;
    city: string;
    province: string;
    role: RoleType;
    customer?: CustomerEntity;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}