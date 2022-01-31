import { Sequelize } from "sequelize-typescript";
import Category from "./models/category.model";
import Product from "./models/product.model";

const location =
  process.env.NODE_ENV === "test" ? ":memory:" : "./multiverse-store.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: location,
  logging: false,
  models: [__dirname + "/models/**/*.model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});

async function loadFromSeed(filename: string) {
  const products: any[] = require(filename);
  const categories: string[] = products.map((v: any) => v.category);

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    if ((await Category.findAll({ where: { name: category } })).length === 0) {
      const c = new Category({ name: category });
      await c.save();
    }
  }

  for (let product of products) {
    const p = new Product(product);
    const c = await Category.findOne({ where: { name: product.category } });
    if (c) {
      p.categoryId = c.id;
    }
    await p.save();
  }
}

export { sequelize, loadFromSeed };
