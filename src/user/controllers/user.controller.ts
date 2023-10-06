import { DeleteResult, UpdateResult } from "typeorm";
import { Request, Response } from "express";
import { UserEntity } from "../entities/user.entity";
import { UserService } from '../services/user.service';
import { HttpResponse } from "../../shared/response/http.response";
import { UserObject } from "../types/service.types";

export class UserController {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {
        this.getUsers = this.getUsers.bind(this);
        this.createUser = this.createUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async getUsers(req: Request, res: Response) {
        try {
            const data: UserEntity[] = await this.userService.findAll();

            if (data.length > 0) {
                return this.httpResponse.Ok(res, data)
            }

            return this.httpResponse.NotFound(res, 'No users were found with the provided criteria')
        } catch (error) {
            console.log(error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            console.log(req.query)
            const { id } = req.params;
            let { customer } = req.query;

            let data: UserEntity | null;
            
            if(customer === 'true') {
                data = await this.userService.findByIdWithRelation(id);
            } else {
                data = await this.userService.findById(id);
            }

            if (data) {
                return this.httpResponse.Ok(res, data)
            }

            return this.httpResponse.NotFound(res, 'Failed to retrieve user details')
        } catch (error) {
            console.log(error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    async createUser(req: Request, res: Response) {

        try {
            //TODO: Validar si el usuario existe antes de crearlo
            const data: UserObject = await this.userService.create(req.body);

            return this.httpResponse.Created(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult = await this.userService.update(id, req.body);

            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Failed to update user details with the provided criteria')
            }

            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult = await this.userService.destroy(id);

            if (!data.affected) {
                return this.httpResponse.NotFound(res, 'Failed to delete user details with the provided criteria')
            }

            return this.httpResponse.Ok(res, data)

        } catch (error) {
            console.log(error)
            return this.httpResponse.InternalServerError(res, error)
        }
    }

}