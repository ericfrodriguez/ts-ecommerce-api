import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { ProductDTO } from "../dto/product.dto";
import { ValidatorMiddleware } from "../../shared/types/middleware.types";

export class ProductMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    productValidator(req: Request): ProductDTO {
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

            return product;
    }
}