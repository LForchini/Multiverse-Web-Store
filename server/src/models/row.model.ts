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
import Cart from './cart.model';
import Product from './product.model';

@Table
export default class CartRow extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @Index('product-cart')
  productId!: number;

  @BelongsTo(() => Product, 'productId')
  product!: Product;

  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @Index('product-cart')
  cartId!: number;

  @BelongsTo(() => Cart, 'cartId')
  cart!: Cart;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity!: number;
}
