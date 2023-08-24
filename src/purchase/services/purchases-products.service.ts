import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductDTO } from "../dto/purchases-products.dto";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";


export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
    constructor() {
        super(PurchaseProductEntity)
    }

    public async findAll(): Promise<PurchaseProductEntity[]> {
        return (await this.execRepository).find();
    }

    public async findById(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }

    public async create(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
        return (await this.execRepository).save(body);
    }
    
    public async update(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id});
    }

}