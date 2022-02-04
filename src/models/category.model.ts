import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Product from './product.model';

@Table
export default class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  name!: string;

  @Column(DataType.TEXT)
  image!: string;

  @Column(DataType.TEXT)
  tagline!: string;

  @HasMany(() => Product)
  members!: Product;
}
