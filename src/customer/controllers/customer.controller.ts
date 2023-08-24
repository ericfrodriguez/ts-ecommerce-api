import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { CustomerEntity } from "../entities/customer.entity";
import { DeleteResult, UpdateResult } from "typeorm";

export class CustomerController {

    constructor(
        private readonly customerService: CustomerService = new CustomerService()
    ) {
        this.getCustomers = this.getCustomers.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.getCustomerById = this.getCustomerById.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    async getCustomers(req: Request, res: Response) {
        try {
            const data: CustomerEntity[] = await this.customerService.findAll();

            return res.status(200).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async getCustomerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: CustomerEntity | null = await this.customerService.findById(id)

            return res.status(200).json({ data });
        } catch (error) {
            console.log(error)
        }
    }

    async createCustomer(req: Request, res: Response) {

        try {
            const data: CustomerEntity = await this.customerService.create(req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async updateCustomer(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult = await this.customerService.update(id, req.body);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult = await this.customerService.destroy(id);

            return res.status(201).json({ data })
        } catch (error) {
            console.log(error)
        }
    }
}