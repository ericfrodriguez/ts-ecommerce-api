import { BaseRouter } from "../shared/router/router";
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from "./middlewares/auth.middleware";

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {

    constructor() {
        super(
            AuthController,
            AuthMiddleware
        );
    }

    routes(): void {
        this.router.post('/auth/login', [
            this.middleware.authenticate("login"),
        ],this.controller.login);
    }
}