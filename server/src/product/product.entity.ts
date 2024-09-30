import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  files: {
    name: string;
    url: string;
  };

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  date: string;

  @Column()
  status: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  category: Category;
}
