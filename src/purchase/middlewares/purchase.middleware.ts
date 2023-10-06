import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { PurchaseDTO } from "../dto/purchase.dto";
import { ValidatorMiddleware } from "../../shared/types/middleware.types";

export class PurchaseMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    purchaseValidator(req: Request): PurchaseDTO {
            const {
                status,
                paymentMethod,
                customer,
            } = req.body;

            const purchase: PurchaseDTO = new PurchaseDTO();

            purchase.status = status;
            purchase.paymentMethod = paymentMethod;
            purchase.customer = customer;

            return purchase;
    }
}