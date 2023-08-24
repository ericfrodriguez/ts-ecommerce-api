import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { PurchaseEntity } from "../entities/purchase.entity";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseController {

    constructor(
        private readonly purchaseService: PurchaseService = new PurchaseService()
    ) {
        this.getPurchases = this.getPurchases.bind(this);
        this.createPurchase = this.createPurchase.bind(this);
        this.getPurchaseById = this.getPurchaseById.bind(this);
        this.updatePurchase = this.updatePurchase.bind(this);
        this.deletePurchase = this.deletePurchase.bind(this);
    }

    async getPurchases(req: Request, res: Response) {
        try {
            const data: PurchaseEntity[] = await this.purchaseService.findAll();

            return res.status(200).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async getPurchaseById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: PurchaseEntity | null = await this.purchaseService.findById(id)

            return res.status(200).json({ data });
        } catch (error) {
            console.log(error)
        }
    }

    async createPurchase(req: Request, res: Response) {

        try {
            const data: PurchaseEntity = await this.purchaseService.create(req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async updatePurchase(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult = await this.purchaseService.update(id, req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async deletePurchase(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult = await this.purchaseService.destroy(id);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }
}