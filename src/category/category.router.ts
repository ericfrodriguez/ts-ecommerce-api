import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";
import { CategoryMiddleware } from "./middlewares/category.middleware";

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {

    constructor(){
        super(CategoryController, CategoryMiddleware)
    }

    routes(): void {
        this.router.get('/categories', this.controller.getCategories);
        this.router.post('/categories', this.controller.createCategory);
        this.router.get('/categories/:id', this.controller.getCategoryById);
        this.router.put('/categories/:id', this.controller.updateCategory);
        this.router.delete('/categories/:id', this.controller.deleteCategory);
    }
}
