import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data.source';

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

    get initConnect(): Promise<DataSource> {
        const db = AppDataSource;

        return db.initialize();
    }
}
