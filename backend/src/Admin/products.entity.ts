import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Products")
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  photos: string;
}
