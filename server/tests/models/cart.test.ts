import Cart from "../../src/models/cart.model";
import { sequelize } from "../../src/sequelize";

describe("Cart", () => {
  beforeAll(async () => {
    sequelize.sync();
  });

  it("can generate a random cookie", () => {
    const cart = new Cart();
    const cookie = cart.generateCookie();
    expect(cookie.length).toBe(128);
    expect(cart.cookie).toEqual(cookie);
    expect(cookie).not.toEqual(cart.generateCookie());
  });
});
