import { RoleType } from "../../user/dto/user.dto";
import { UserEntity } from "../../user/entities/user.entity";

export interface PayloadToken {
    role: RoleType;
    sub: string;
}

export interface AuthCredentials {
    accessToken: string;
    user: UserEntity;
}