import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'category' })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
