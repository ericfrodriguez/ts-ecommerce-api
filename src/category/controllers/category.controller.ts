import { Request, Response } from "express";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryService } from '../services/category.service';
import { DeleteResult, UpdateResult } from "typeorm";

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService = new CategoryService()
    ) {
        this.getCategories = this.getCategories.bind(this)
        this.createCategory = this.createCategory.bind(this)
        this.getCategoryById = this.getCategoryById.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
    }

    async getCategories(req: Request, res: Response) {
        try {
            const data: CategoryEntity[] = await this.categoryService.findAll();

            return res.status(200).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const data: CategoryEntity = await this.categoryService.create(req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async getCategoryById(req: Request, res: Response) {

        const { id } = req.params;
        try {
            const data: CategoryEntity | null = await this.categoryService.findById(id)

            return res.status(200).json({ data });
        } catch (error) {
            console.log(error)
        }
    }

    async updateCategory(req: Request, res: Response) {

        const { id } = req.params;

        try {
            const data: UpdateResult = await this.categoryService.update(id, req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCategory(req: Request, res: Response) {

        const { id } = req.params;

        try {
            const data: DeleteResult = await this.categoryService.destroy(id);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }
}