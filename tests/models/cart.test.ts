import Cart from '../../api/src/models/cart.model';
import CartRow from '../../api/src/models/row.model';
import User from '../../api/src/models/user.model';
import { sequelize } from '../../api/src/sequelize';

describe('Cart', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it('can be created and saved', async () => {
    const user = new User();
    const session = user.generateSession();
    await user.save();
    await user.reload();

    const cart = new Cart({ userId: user.id });
    await cart.save();
    await cart.reload({ include: [CartRow, User] });

    expect(cart.user.session).toBe(session);
    expect(cart.id).not.toBe(undefined);
    expect(cart.rows.length).toBe(0);
  });
});
