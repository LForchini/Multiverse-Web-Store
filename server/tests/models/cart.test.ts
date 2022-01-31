import Cart from "../../src/models/cart.model";
import CartRow from "../../src/models/row.model";
import { sequelize } from "../../src/sequelize";

describe("Cart", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it("can generate a random cookie", () => {
    const cart = new Cart();
    const cookie = cart.generateCookie();
    expect(cookie.length).toBe(128);
    expect(cart.cookie).toEqual(cookie);
    expect(cookie).not.toEqual(cart.generateCookie());
  });

  it("can be created and saved", async () => {
    const cart = new Cart();
    const cookie = cart.generateCookie();
    await cart.save();
    await cart.reload({ include: [CartRow] });

    expect(cart.cookie).toBe(cookie);
    expect(cart.id).not.toBe(undefined);
    expect(cart.rows.length).toBe(0);
  });
});
