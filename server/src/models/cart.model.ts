import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CartRow from "./row.model";

@Table
export default class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Index
  @Column(DataType.TEXT)
  cookie!: string;

  @HasMany(() => CartRow)
  rows!: CartRow[];

  /**
   * Generates a random cookie and sets it.
   * @returns The generated cookie.
   */
  generateCookie(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    this.cookie = "";
    for (let i = 0; i < 128; i++) {
      this.cookie += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return this.cookie;
  }
}
