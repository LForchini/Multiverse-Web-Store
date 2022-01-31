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
} from "sequelize-typescript";
import CartRow from "./row.model";
import User from "./user.model";

@Table
export default class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User, "userId")
  user!: User;

  @HasMany(() => CartRow)
  rows!: CartRow[];
}
