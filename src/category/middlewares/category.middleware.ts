import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { CategoryDTO } from "../dto/category.dto";
import { ValidatorMiddleware } from "../../shared/types/middleware.types";

export class CategoryMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    mapCreateCategoryData(req: Request): CategoryDTO {
            const { categoryName } = req.body;

            const category: CategoryDTO = new CategoryDTO();

            category.categoryName = categoryName;

            return category;
    }
}