import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseDTO } from "../dto/purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseService extends BaseService<PurchaseEntity> {
    constructor() {
        super(PurchaseEntity);
    }

    public async findAll(): Promise<PurchaseEntity[]> {
        return (await this.execRepository).find();
    }

    public async findById(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }

    public async create(body: PurchaseDTO): Promise<PurchaseEntity> {
        return (await this.execRepository).save(body);
    }
    
    public async update(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id});
    }

}