import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export abstract class ServerConfig {
    constructor(){
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv
        })
    }

    public getEnvironment(key: string): string | undefined {
        return process.env[key]
    }

    public getNumberEnv(key: string): number {
        return Number(this.getEnvironment(key))
    }

    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || '';
    }

    public createPathEnv(path: string): string {
        const arrEnv: string[] = ['env'];

        if(path.length > 0) {
            const stringToArr = path.split('.');
            arrEnv.unshift(...stringToArr);
        }

        return `.${arrEnv.join('.')}`;
    }

    public get typeORMConfig(): DataSourceOptions {
        return {
            type: 'mysql',
            host: this.getEnvironment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            username: this.getEnvironment('DB_USER'),
            database: this.getEnvironment('DB_DATABASE'),
            password: this.getEnvironment('DB_PASSWORD'),
            entities: [__dirname + '/../**/*.entity{*.ts,.js}'],
            migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
        }
    }

    public async dbConnect(): Promise<DataSource> {
            const myDataSource = new DataSource(this.typeORMConfig);
            const connection = await myDataSource.initialize();
            return connection;
    }
}
