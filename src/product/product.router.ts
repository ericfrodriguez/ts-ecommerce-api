import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { ProductMiddleware } from "./middlewares/product.middleware";

export class ProductRouter extends BaseRouter<ProductController, ProductMiddleware> {

    constructor() {
        super(ProductController, ProductMiddleware)
    }

    routes(): void {
        this.router.get('/products', this.controller.getProducts);
        this.router.post('/products', this.controller.createProduct);
        this.router.get('/products/:id', this.controller.getProductById);
        this.router.put('/products/:id', this.controller.updateProduct);
        this.router.delete('/products/:id', this.controller.deleteProduct);
    }
}