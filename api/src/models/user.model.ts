import {
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Cart from './cart.model';

export enum UserTypes {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  name!: string;

  @Column(DataType.TEXT)
  email!: string;

  @Column(DataType.TEXT)
  password!: string;

  @Column(DataType.ENUM({ values: Object.keys(UserTypes) }))
  type!: UserTypes;

  @Index
  @Column(DataType.TEXT)
  session!: string | null;

  @HasOne(() => Cart, { onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true })
  cart!: Cart;

  /**
   * Generates a random session token and sets it.
   * @returns The generated session token.
   */
  generateSession(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    this.session = '';
    for (let i = 0; i < 128; i++) {
      this.session += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return this.session;
  }
}
