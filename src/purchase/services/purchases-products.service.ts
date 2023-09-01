import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductDTO } from "../dto/purchases-products.dto";
import { PurchaseProductEntity } from "../entities/purchases-products.entity";
import { ProductService } from '../../product/services/product.service';


export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
    constructor(
        private readonly productService: ProductService = new ProductService()
    ) {
        super(PurchaseProductEntity)
    }

    public async findAll(): Promise<PurchaseProductEntity[]> {
        return (await this.execRepository).find();
    }

    public async findById(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }

    public async create(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
        const newPP = (await this.execRepository).create(body);
        const product = await this.productService.findById(newPP.product.id);

        newPP.totalPrice = product!.price * newPP.quantityProduct;

        return (await this.execRepository).save(newPP);
    }
    
    public async update(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    public async destroy(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id});
    }

}