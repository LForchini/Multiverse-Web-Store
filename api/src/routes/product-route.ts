import express, { Request, Response } from 'express';
import Category from '../models/category.model';
import Image from '../models/image.model';
import Product from '../models/product.model';
import { check, validationResult } from 'express-validator';
import { getRequester } from './user-route';
import { UserTypes } from '../models/user.model';

export const router = express.Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
  const products = await Product.findAll({ include: [Image, Category] });
  res.send(products);
});

router.get('/:id', async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id, {
    include: [Image, Category],
  });
  res.send(product);
});

router.post(
  '/',
  [
    check('title').isAlphanumeric().notEmpty(),
    check('description').isAlphanumeric().notEmpty(),
    check('price').isInt().notEmpty(),
    check('images').isArray().isLength({ min: 2, max: 2 }),
    check('images[0]').isURL(),
    check('images[1]').isURL(),
    check('categoryId').isNumeric().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const requester = await getRequester(req.cookies.session);

      if (requester.type === UserTypes.ADMIN) {
        const product_data = {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          categoryId: req.body.categoryId,
        };

        const product = new Product(product_data);
        await product.save();
        await product.reload();

        await new Image({
          image: req.body.images[0],
          productId: product.id,
        }).save();
        await new Image({
          image: req.body.images[1],
          productId: product.id,
        }).save();

        await product.reload({ include: [Image, Category] });

        res.send(product);
      } else {
        throw new Error('Permission denied');
      }
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  }
);

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const requester = await getRequester(req.cookies.session);

    if (requester.type === UserTypes.ADMIN) {
      const product = await Product.findByPk(req.params.id);

      if (product) {
        product.destroy();
        res.sendStatus(200);
      } else {
        throw new Error('Product not found');
      }
    } else {
      throw new Error('Permission denied');
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.patch(
  '/:id',
  [
    check('title').isAlphanumeric(),
    check('description').isAlphanumeric(),
    check('price').isInt(),
    check('categoryId').isNumeric(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const requester = await getRequester(req.cookies.session);

      if (requester.type === UserTypes.ADMIN) {
        const product = await Product.findByPk(req.params.id);

        if (product) {
          if (req.body.title) product.title = req.body.title;
          if (req.body.description) product.title = req.body.title;
          if (req.body.price) product.title = req.body.title;
          if (req.body.categoryId) product.title = req.body.title;
          if (req.body.images) {
            product.images[0].destroy();
            product.images[1].destroy();
            new Image({
              image: req.body.images[0],
              productId: product.id,
            }).save();
            new Image({
              image: req.body.images[1],
              productId: product.id,
            }).save();
          }
          await product.save();
          await product.reload({ include: [Image, Category] });
          res.send(product);
        } else {
          throw new Error('Product not found');
        }
      } else {
        throw new Error('Permission denied');
      }
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  }
);
