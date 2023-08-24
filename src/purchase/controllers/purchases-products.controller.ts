import { DeleteResult, UpdateResult } from "typeorm";
import { Request, Response } from "express";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";
import { PurchaseProductService } from "../services/purchases-products.service";

export class PurchaseProductController {

    constructor(
        private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService()
    ) {
        this.getPurchasesProducts = this.getPurchasesProducts.bind(this);
        this.createPurchaseProduct = this.createPurchaseProduct.bind(this);
        this.getPurchaseProductById = this.getPurchaseProductById.bind(this);
        this.updatePurchaseProduct = this.updatePurchaseProduct.bind(this);
        this.deletePurchaseProduct = this.deletePurchaseProduct.bind(this);
    }

    async getPurchasesProducts(req: Request, res: Response) {
        try {
            const data: PurchaseProductEntity[] = await this.purchaseProductService.findAll();

            return res.status(200).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async getPurchaseProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: PurchaseProductEntity | null = await this.purchaseProductService.findById(id)

            return res.status(200).json({ data });
        } catch (error) {
            console.log(error)
        }
    }

    async createPurchaseProduct(req: Request, res: Response) {

        try {
            const data: PurchaseProductEntity = await this.purchaseProductService.create(req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async updatePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult = await this.purchaseProductService.update(id, req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async deletePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult = await this.purchaseProductService.destroy(id);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

}