import { BaseRouter } from "../shared/router/router";
import { PurchaseProductController } from "./controllers/purchases-products.controller";
import { PurchaseMiddleware } from "./middlewares/purchase.middleware";

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseMiddleware> {
    constructor() {
        super(PurchaseProductController, PurchaseMiddleware);
    }

    routes(): void {
        this.router.get('/purchases-products', this.controller.getPurchasesProducts);
        this.router.post('/purchases-products', this.controller.createPurchaseProduct);
        this.router.get('/purchases-products/:id', this.controller.getPurchaseProductById);
        this.router.put('/purchases-products/:id', this.controller.updatePurchaseProduct);
        this.router.delete('/purchases-products/:id', this.controller.deletePurchaseProduct);
    }
}