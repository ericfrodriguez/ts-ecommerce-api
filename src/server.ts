import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './user/user.router';
import { ServerConfig } from './config/config';

class ServerBootstrap extends ServerConfig {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8000;

    constructor() {
        super();

        this.dbConnect();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers());

        this.listen();
    }

    routers(): express.Router[] {
        return [
            new UserRouter().router
        ]
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ' + this.port);
        });
    }
}

new ServerBootstrap();