import 'reflect-metadata';
import 'source-map-support/register';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './user/user.router';
import { ServerConfig } from './config/config';
import { CategoryRouter } from './category/category.router';
import { CustomerRouter } from './customer/customer.router';
import { ProductRouter } from './product/product.router';
import { PurchaseRouter } from './purchase/purchase.router';
import { PurchaseProductRouter } from './purchase/purchases-products.router';
import { DataSource } from 'typeorm';

class ServerBootstrap extends ServerConfig {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8000;

    constructor() {
        super();
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.dbConnect();

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): express.Router[] {
        return [
            new UserRouter().router,
            // new CategoryRouter().router,
            // new CustomerRouter().router,
            // new ProductRouter().router,
            // new PurchaseRouter().router,
            // new PurchaseProductRouter().router,
        ]
    }

    async dbConnect(): Promise<DataSource | void> {
        try {
            const connection = await this.initConnect
            console.log('Database connected')
            return connection;
        } catch (error) {
            console.error(error)
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }
}

new ServerBootstrap();