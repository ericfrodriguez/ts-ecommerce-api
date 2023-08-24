import { Request, Response } from "express";
import { ProductService } from '../services/product.service';
import { ProductEntity } from "../entities/product.entity";
import { DeleteResult, UpdateResult } from "typeorm";

export class ProductController {

    constructor(
        private readonly productService: ProductService = new ProductService()
    ) {
        this.getProducts = this.getProducts.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    async getProducts(req: Request, res: Response) {
        try {
            const data: ProductEntity[] = await this.productService.findAll();

            return res.status(200).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: ProductEntity | null = await this.productService.findById(id)

            return res.status(200).json({ data });
        } catch (error) {
            console.log(error)
        }
    }

    async createProduct(req: Request, res: Response) {

        try {
            const data: ProductEntity = await this.productService.create(req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult = await this.productService.update(id, req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult = await this.productService.destroy(id);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }
}