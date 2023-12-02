import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entitie';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: string;

  @OneToMany(
    () => ProductEntity,
    (products: ProductEntity) => products.category
  )
  products?: ProductEntity;
}
