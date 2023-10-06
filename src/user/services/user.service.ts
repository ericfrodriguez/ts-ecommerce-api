import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO, RoleType } from '../dto/user.dto';
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { ReadServiceOpts, UserObject } from "../types/service.types";

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
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

    public async findUserByEmail(email: string): Promise<UserEntity | null> {

        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ email })
            .getOne()
    }

    public async findUserWithRole(id: string, role: RoleType, opts?: ReadServiceOpts): Promise<UserEntity | null> {
        let user: Promise<UserEntity | null>;

        if (opts?.selectPassword) {
            user = (await this.execRepository)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where({ id })
                .andWhere({ role })
                .getOne()
        }

        user = (await this.execRepository)
            .createQueryBuilder('user')
            .where({ id })
            .andWhere({ role })
            .getOne()

        return user;
    }

    public async findUserByUsername(username: string): Promise<UserEntity | null> {

        return (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ username })
            .getOne()
    }

    public async create(body: UserDTO): Promise<UserObject> {
        const newUser: UserEntity = (await this.execRepository).create(body);

        const hash: string = await bcrypt.hash(newUser.password, 10);

        newUser.password = hash;

        const userToResponse: UserObject = {...newUser};
        delete userToResponse.password;
        delete userToResponse.createdAt;
        delete userToResponse.updatedAt;
        delete userToResponse.customer;


        const savedUser: UserEntity = await (await this.execRepository).save(newUser);

        return userToResponse;
    }

    public async update(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

}