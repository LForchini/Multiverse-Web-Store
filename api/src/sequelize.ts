import { Sequelize } from 'sequelize-typescript';
import Category from './models/category.model';
import Image from './models/image.model';
import Product from './models/product.model';
import User, { UserTypes } from './models/user.model';

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
    const cat = new Category({
      name: category.name,
      image: category.image,
      tagline: category.tagline,
    });
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

  const admin = new User({
    email: 'leonardo.forchini@gmail.com',
    password:
      '87e87fd4d3e8579677944048cf6a083e1118b2df3ddcadadc00b7be4f8071653',
    type: UserTypes.ADMIN,
  });
  await admin.save();
}

export { sequelize, loadFromSeed };
