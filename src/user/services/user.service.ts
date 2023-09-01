import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    public async findAll(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }

    public async findById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    public async findByIdWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.customer', 'customer')
            .where({ id })
            .getOne()
    }

    public async create(body: UserDTO): Promise<UserEntity> {
        return (await this.execRepository).save(body);
    }

    public async update(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

}