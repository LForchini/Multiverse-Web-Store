import Cart from '../../api/src/models/cart.model';
import Product from '../../api/src/models/product.model';
import CartRow from '../../api/src/models/row.model';
import User from '../../api/src/models/user.model';
import { sequelize } from '../../api/src/sequelize';

describe('Product', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it('can be created and linked with other models', async () => {
    const user = new User();
    user.generateSession();
    await user.save();
    await user.reload();
    const product = new Product({});
    await product.save();
    await product.reload();
    const cart = new Cart({ userId: user.id });
    await cart.save();
    await cart.reload();

    const row = new CartRow({
      cartId: cart.id,
      productId: product.id,
      quantity: 1,
    });
    await row.save();
    await row.reload({ include: [Cart, Product] });

    expect(row.cartId).toBe(cart.id);
    expect(row.productId).toBe(product.id);
    expect(row.cart.toJSON()).toEqual(cart.toJSON());
    expect(row.product.toJSON()).toEqual(product.toJSON());

    const row2 = await CartRow.findByPk(row.id);
    await cart.reload({ include: [CartRow] });
    expect(cart.rows.length).toBe(1);
    expect(cart.rows[0].toJSON()).toEqual(row2?.toJSON());
  });
});
