import Category from "../src/models/category.model";
import Product from "../src/models/product.model";
import { loadFromSeed, sequelize } from "../src/sequelize";

describe("Sequelize", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("loads json correctly", async () => {
    await loadFromSeed("./seed.json");

    expect(await Product.count()).toBeGreaterThan(0);
    expect(await Category.count()).toBeGreaterThan(0);
  });
});
