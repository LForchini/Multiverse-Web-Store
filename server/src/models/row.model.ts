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
} from "sequelize-typescript";
import Cart from "./cart.model";
import Product from "./product.model";

@Table
export default class CartRow extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  @Index("product-cart")
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => Cart)
  @Column(DataType.INTEGER)
  @Index("product-cart")
  cartId!: number;

  @BelongsTo(() => Product)
  cart!: Cart;

  @Column(DataType.INTEGER)
  quantity!: number;
}
