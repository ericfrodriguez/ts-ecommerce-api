import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { CustomerDTO } from "../dto/customer.dto";
import { ValidatorMiddleware } from "../../shared/types/middleware.types";

export class CustomerMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    async customerValidator(req: Request, res: Response, next: NextFunction): Promise<ValidatorMiddleware | void> {
        try {
            const {
                address,
                dni,
                user
            } = req.body;

            const customer: CustomerDTO = new CustomerDTO();

            customer.address = address;
            customer.dni = dni;
            customer.user = user;

            return this.validator(customer);

        } catch (error) {
            this.httpResponse.InternalServerError(res, error)
        }
    }
}