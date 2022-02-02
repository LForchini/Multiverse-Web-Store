import { Sequelize } from 'sequelize-typescript';
import Category from './models/category.model';
import Image from './models/image.model';
import Product from './models/product.model';

const location =
  process.env.NODE_ENV === 'test' ? ':memory:' : './multiverse-store.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: location,
  logging: false,
  models: [__dirname + '/models/**/*.model.ts'],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
    );
  },
});

async function loadFromSeed(filename: string) {
  const categories: any[] = require(filename);

  for (let category of categories) {
    const cat = new Category({ name: category.name, image: category.image });
    await cat.save();
    await cat.reload();

    for (let product of category.products) {
      const prod = new Product({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: cat.id,
      });
      await prod.save();
      await prod.reload();

      for (let image of product.images) {
        const img = new Image({
          image: image,
          productId: prod.id,
        });
        img.save();
      }
    }
  }
}

export { sequelize, loadFromSeed };
