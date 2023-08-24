import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";

export class UserRouter extends BaseRouter<UserController> {

    constructor() {
        super(UserController)
    }

    routes(): void {
        this.router.get('/users', this.controller.getUsers);
        this.router.post('/users', this.controller.createUser);
        this.router.get('/users/:id', this.controller.getUserById);
        this.router.put('/users/:id', this.controller.updateUser);
        this.router.delete('/users/:id', this.controller.deleteUser);
    }
}