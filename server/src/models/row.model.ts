import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
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
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => Cart)
  @Column(DataType.INTEGER)
  cartId!: number;

  @BelongsTo(() => Product)
  cart!: Cart;

  @Column(DataType.INTEGER)
  quantity!: number;
}
