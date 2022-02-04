import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Index,
} from 'sequelize-typescript';
import Product from './product.model';

@Table
export default class Image extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @Index
  productId!: number;

  @BelongsTo(() => Product, 'productId')
  product!: Product;

  @Column({ type: DataType.TEXT, allowNull: false })
  image!: string;
}
