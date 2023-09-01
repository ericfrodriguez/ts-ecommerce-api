import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";
import { UserMiddleware } from "./middlewares/user.middleware";

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {

    constructor() {
        super(UserController, UserMiddleware)
    }

    routes(): void {
        this.router.get('/users', this.controller.getUsers);
        this.router.post('/users', this.middleware.userValidator, this.controller.createUser);
        this.router.get('/users/:id', this.controller.getUserById);
        this.router.put('/users/:id', this.controller.updateUser);
        this.router.delete('/users/:id', this.controller.deleteUser);
    }
}