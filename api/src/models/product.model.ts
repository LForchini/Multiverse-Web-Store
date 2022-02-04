import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Category from './category.model';
import Image from './image.model';

@Table
export default class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  title!: string;

  @Column(DataType.INTEGER)
  price!: number;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Category)
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(() => Image)
  images!: Image[];
}
