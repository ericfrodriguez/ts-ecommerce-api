import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { UserEntity } from "../../user/entities/user.entity";
import { BaseEntity } from "../../config/base.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({ name: 'customers' })
export class CustomerEntity extends BaseEntity {
    
    @Column()
    address!: string;
    
    @Column()
    dni!: string;
    
    @OneToOne(() => UserEntity, (user) => user.customer)
    @JoinColumn({name: 'user_id'})
    user!: UserEntity;

    @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
    purchases!: PurchaseEntity[];
}