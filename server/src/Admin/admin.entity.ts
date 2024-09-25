import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("Admin")
export class AdminEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;
  
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true }) // Allow null values for the 'photo' column
  photo: string;
}
