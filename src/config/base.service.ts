import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ServerConfig } from "./config";

export class BaseService<T extends BaseEntity> extends ServerConfig {

    public execRepository: Promise< Repository<T> >

    constructor(
        private getEntity: EntityTarget<T>
    ) {
        super();
        this.execRepository = this.initRepository(this.getEntity);
    }

    async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise< Repository<T> > {
        const getConn = await this.initConnect;

        return getConn.getRepository(entity);
    }
}