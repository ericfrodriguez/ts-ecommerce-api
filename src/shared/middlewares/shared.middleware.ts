import { NextFunction, Request, Response } from "express";
import { BaseDTO } from "../../config/base.dto";
import { HttpResponse } from "../response/http.response";
import { validate } from 'class-validator';
import { ValidatorMiddleware } from "../types/middleware.types";
import passport from "passport";
import { RoleType } from "../../user/dto/user.dto";
import { UserEntity } from "../../user/entities/user.entity";

type AuthStrategies = 'login' | 'jwt';

export class SharedMiddleware {

    constructor(
        public httpResponse: HttpResponse = new HttpResponse()
    ) {
        this.checkAdminRole = this.checkAdminRole.bind(this)
    }

    public validator<T extends BaseDTO>(mapRequestBody: (req: Request) => T): ValidatorMiddleware {

        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const bodyRequestData: T = mapRequestBody(req);

                const errors = await validate(bodyRequestData);

                if (errors.length > 0) {
                    return this.httpResponse.InternalServerError(res, errors);
                } else {
                    return next();
                }
            } catch (error) {
                return this.httpResponse.InternalServerError(res, error)
            }
        }
    }

    public authenticate(type: AuthStrategies) {
        return passport.authenticate(type, { session: false });
    }

    public checkAdminRole(req: Request, res: Response, next: NextFunction) {
        const user = req.user as UserEntity;

        if (user.role === RoleType.ADMIN) {
            return next();
        }

        return this.httpResponse.Unauthorized(res, 'Admin role is needed');
    }
}