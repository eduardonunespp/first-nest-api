import { CategoryEntity } from 'src/category/entities/category.entitie';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'category_id', nullable: false })
  category_id: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'image', nullable: false })
  image: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: string;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products
  )
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;
}
