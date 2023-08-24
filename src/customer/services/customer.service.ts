import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CustomerDTO } from "../dto/customer.dto";
import { CustomerEntity } from "../entities/customer.entity";

export class CustomerService extends BaseService<CustomerEntity> {
    constructor() {
        super(CustomerEntity)
    }

    public async findAll(): Promise<CustomerEntity[]> {
        return (await this.execRepository).find();
    }

    public async findById(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }

    public async create(body: CustomerDTO): Promise<CustomerEntity> {
        return (await this.execRepository).save(body);
    }
    
    public async update(id: string, infoUpdate: CustomerDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id});
    }

}