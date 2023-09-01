import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { ValidatorMiddleware } from '../../shared/types/middleware.types';
import { validate } from "class-validator";

export class UserMiddleware extends SharedMiddleware {

    constructor() {
        super();
        this.userValidator = this.userValidator.bind(this)
    }

    async userValidator(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
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

            const errors = await validate(user)
            if (errors.length > 0) {
                return this.httpResponse.InternalServerError(res, errors)
            } else {
                return next()
            }

        } catch (error) {
            this.httpResponse.InternalServerError(res, error)
        }
    }
}