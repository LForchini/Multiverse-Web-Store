import User from '../../api/src/models/user.model';
import { sequelize } from '../../api/src/sequelize';

describe('User', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it('can be created and saved', async () => {
    const user = new User();
    await user.save();
    await user.reload({ include: [] });

    expect(user.id).not.toBe(undefined);
  });

  it('can generate a random cookie', () => {
    const user = new User();
    const session = user.generateSession();
    expect(session.length).toBe(128);
    expect(user.session).toEqual(session);
    expect(session).not.toEqual(user.generateSession());
  });
});
