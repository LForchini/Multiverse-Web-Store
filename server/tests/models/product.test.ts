import Product from "../../src/models/product.model";
import { sequelize } from "../../src/sequelize";

describe("Product", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it("can be created and saved", async () => {
    const product = new Product();
    await product.save();
    await product.reload({ include: [] });

    expect(product.id).not.toBe(undefined);
  });
});
