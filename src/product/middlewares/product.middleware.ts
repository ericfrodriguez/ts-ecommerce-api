import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { ProductDTO } from "../dto/product.dto";
import { ValidatorMiddleware } from "../../shared/types/middleware.types";

export class ProductMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    async productValidator(req: Request, res: Response, next: NextFunction): Promise<ValidatorMiddleware | void> {
        try {
            const {
                productName,
                description,
                price,
                category
            } = req.body;

            const product: ProductDTO = new ProductDTO();

            product.productName = productName;
            product.description = description;
            product.price = price;
            product.category = category;

            return this.validator(product);

        } catch (error) {
            this.httpResponse.InternalServerError(res, error)
        }
    }
}