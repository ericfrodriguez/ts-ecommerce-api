import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { ValidatorMiddleware } from '../../shared/types/middleware.types';
import { validate } from "class-validator";

export class UserMiddleware extends SharedMiddleware {

    constructor() {
        super();
        this.mapCreateUserData = this.mapCreateUserData.bind(this)
    }

    mapCreateUserData(req: Request): UserDTO {
            const {
                name,
                lastname,
                username,
                email,
                password,
                city,
                province,
                role } = req.body;

            const user: UserDTO = new UserDTO();

            user.name = name;
            user.lastname = lastname;
            user.username = username;
            user.email = email;
            user.password = password;
            user.city = city;
            user.province = province;
            user.role = role;

            return user;
    }
}