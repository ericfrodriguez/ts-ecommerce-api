import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from '../entities/category.entity';

export class CategoryService extends BaseService<CategoryEntity> {
    constructor() {
        super(CategoryEntity)
    }

    public async findAll(): Promise<CategoryEntity[]> {
        return (await this.execRepository).find();
    }

    public async findById(id: string): Promise<CategoryEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }
    
    public async create(body: CategoryDTO): Promise<CategoryEntity> {

        return (await this.execRepository).save(body);
    }
    
    public async update(id: string, infoUpdate: CategoryDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id});
    }

}