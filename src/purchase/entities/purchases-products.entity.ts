import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "./purchase.entity";

@Entity({ name: 'purchases_products' })
export class PurchaseProductEntity extends BaseEntity {
    
    @Column()
    quantityProduct!: number;
    
    @Column()
    totalPrice!: number;

    @ManyToOne(() => ProductEntity, (product) => product.purchaseProducts)
    @JoinColumn({name: 'product_id'})
    product!: ProductEntity;
    
    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProducts)
    @JoinColumn({name: 'purchase_id'})
    purchase!: PurchaseEntity;
}