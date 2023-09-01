import { NextFunction, Request, Response } from "express";
import { BaseDTO } from "../../config/base.dto";
import { HttpResponse } from "../response/http.response";
import { validate } from 'class-validator';
import { ValidatorMiddleware } from "../types/middleware.types";

export class SharedMiddleware {

    constructor(
        public httpResponse: HttpResponse = new HttpResponse()
    ) { }

    protected validator<T extends BaseDTO>(req: Request, res: Response, next: NextFunction): ValidatorMiddleware {

        return async (req: Request, res: Response, next: NextFunction) => {
            const errors = await validate(schema)
            if(errors.length > 0){
                return this.httpResponse.InternalServerError(res, errors)
            } else {
                return next()
            }
        }
    }
}