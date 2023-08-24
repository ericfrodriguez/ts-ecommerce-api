import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../dto/product.dto";
import { ProductEntity } from '../entities/product.entity';

export class ProductService extends BaseService<ProductEntity> {
    
    constructor() {
        super(ProductEntity);
    }

    public async findAll(): Promise<ProductEntity[]> {
        return (await this.execRepository).find();
    }

    public async findById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }

    public async create(body: ProductDTO): Promise<ProductEntity> {
        return (await this.execRepository).save(body);
    }
    
    public async update(id: string, infoUpdate: ProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id});
    }
}