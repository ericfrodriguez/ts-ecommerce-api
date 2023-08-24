import { BaseRouter } from "../shared/router/router";
import { PurchaseProductController } from "./controllers/purchases-products.controller";

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController> {
    constructor() {
        super(PurchaseProductController);
    }

    routes(): void {
        this.router.get('/purchases-products', this.controller.getPurchasesProducts);
        this.router.post('/purchases-products', this.controller.createPurchaseProduct);
        this.router.get('/purchases-products/:id', this.controller.getPurchaseProductById);
        this.router.put('/purchases-products/:id', this.controller.updatePurchaseProduct);
        this.router.delete('/purchases-products/:id', this.controller.deletePurchaseProduct);
    }
}