import { Request } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomerMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    customerValidator(req: Request): CustomerDTO {
            const {
                address,
                dni,
                user
            } = req.body;

            const customer: CustomerDTO = new CustomerDTO();

            customer.address = address;
            customer.dni = dni;
            customer.user = user;

            return customer;
    }
}