import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from './category.entity'; // Assume Category entity is created

@Entity("Products")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  details: string;

  @Column({ nullable: true })
  date: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  photos: string;

  @ManyToOne(() => CategoryEntity, category => category.products)
  category: CategoryEntity;
}
