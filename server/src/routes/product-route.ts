import express, { Request, Response } from 'express';
import Category from '../models/category.model';
import Image from '../models/image.model';
import Product from '../models/product.model';

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
