import { BaseRouter } from "../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerMiddleware } from "./middlewares/customer.middleware";

export class CustomerRouter extends BaseRouter<CustomerController, CustomerMiddleware> {
    constructor() {
        super(CustomerController, CustomerMiddleware)
    }

    routes(): void {
        this.router.get('/customers', this.controller.getCustomers);
        this.router.post('/customers', this.controller.createCustomer);
        this.router.get('/customers/:id', this.controller.getCustomerById);
        this.router.put('/customers/:id', this.controller.updateCustomer);
        this.router.delete('/customers/:id', this.controller.deleteCustomer);
    }

}