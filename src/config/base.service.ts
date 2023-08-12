import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ServerConfig } from "./config";

export class BaseService<T extends BaseEntity> extends ServerConfig {

    public execRepository: Promise< Repository<T> >

    constructor(
        private getEntity: EntityTarget<T>
    ) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise< Repository<T> > {
        const getConn = await this.dbConnect();

        return getConn.getRepository(entity);
    }
}