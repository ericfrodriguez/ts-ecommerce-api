import { Router } from "express";
import { SharedMiddleware } from "../middlewares/shared.middleware";

export class BaseRouter<T, U> {
    public router: Router;
    public controller: T;
    public middleware: U;

    constructor(
        TController: {new (): T},
        UMiddleware: {new (): U}
    ) {
        this.router = Router();
        this.controller = new TController();
        this.middleware = new UMiddleware();
        this.routes();
    }

    routes() {}

}