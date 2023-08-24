import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({
    path: process.env.NODE_ENV ? `.${process.env.NODE_ENV?.trim()}.env` : '.env'
});


const Config: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity{*.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
}

export const AppDataSource: DataSource = new DataSource(Config);
