import { BaseRouter } from "./router";
import { UserController } from "../controller/user.controller";

export class UserRouter extends BaseRouter<UserController> {

    constructor() {
        super(UserController)
    }

    routes(): void {
        this.router.get('/users', this.controller.getUsers)
    }
}