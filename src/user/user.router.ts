import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";
import { UserDTO } from "./dto/user.dto";
import { UserMiddleware } from "./middlewares/user.middleware";

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {

    constructor() {
        super(UserController, UserMiddleware)
    }

    routes(): void {
        this.router.post('/users/register', [
            this.middleware.validator<UserDTO>(this.middleware.mapCreateUserData),
        ], this.controller.createUser);
        this.router.get('/users', [
            this.middleware.authenticate("jwt"),
            this.middleware.checkAdminRole,
        ],this.controller.getUsers);
        this.router.get('/users/:id', this.controller.getUserById);
        this.router.put('/users/:id', this.controller.updateUser);
        this.router.delete('/users/:id', [
            this.middleware.authenticate("jwt"),
            this.middleware.checkAdminRole,
        ],this.controller.deleteUser);
    }
}