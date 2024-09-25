import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProductEntity } from "./products.entity";

@Entity("Categories")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
