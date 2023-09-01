import { BaseRouter } from "../shared/router/router";
import { PurchaseController } from "./controllers/purchase.controller";
import { PurchaseMiddleware } from "./middlewares/purchase.middleware";

export class PurchaseRouter extends BaseRouter<PurchaseController, PurchaseMiddleware> {
    constructor() {
        super(PurchaseController, PurchaseMiddleware);
    }

    routes(): void {
        this.router.get('/purchases', this.controller.getPurchases);
        this.router.post('/purchases', this.controller.createPurchase);
        this.router.get('/purchases/:id', this.controller.getPurchaseById);
        this.router.put('/purchases/:id', this.controller.updatePurchase);
        this.router.delete('/purchases/:id', this.controller.deletePurchase);
    }
}