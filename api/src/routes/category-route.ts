import express, { Request, Response } from 'express';
import Category from '../models/category.model';
import Image from '../models/image.model';
import Product from '../models/product.model';

export const router = express.Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    include: [{ model: Product, include: [Image] }],
    nest: true,
  });
  res.send(categories);
});

router.get('/:id', async (req: Request, res: Response) => {
  const category = await Category.findByPk(req.params.id, {
    include: { model: Product, include: [Image] },
  });
  res.send(category);
});
