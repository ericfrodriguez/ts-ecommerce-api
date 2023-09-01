import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { CategoryDTO } from "../dto/category.dto";
import { ValidatorMiddleware } from "../../shared/types/middleware.types";

export class CategoryMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    async categoryValidator(req: Request, res: Response, next: NextFunction): Promise<ValidatorMiddleware | void> {
        try {
            const { categoryName } = req.body;

            const category: CategoryDTO = new CategoryDTO();

            category.categoryName = categoryName;

            return this.validator(category);

        } catch (error) {
            this.httpResponse.InternalServerError(res, error)
        }
    }
}