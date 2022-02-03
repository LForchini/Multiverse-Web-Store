import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import CartRow from '../models/row.model';
import User from '../models/user.model';
import Image from '../models/image.model';

export const router = express.Router({ mergeParams: true });

async function getCartBySession(session: string): Promise<Cart> {
  if (session) {
    const requester = await User.findOne({
      where: { session: session },
      include: [Cart],
    });

    if (requester) {
      await requester.cart.reload({
        include: [
          { model: CartRow, include: [{ model: Product, include: [Image] }] },
        ],
      });
      const cart = requester.cart;
      if (cart) {
        return cart;
      } else {
        const new_cart = new Cart({ userId: requester.id });
        await new_cart.save();
        return cart;
      }
    } else {
      throw new Error('Invalid session');
    }
  } else {
    throw new Error('Not logged in');
  }
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const cart = await getCartBySession(req.cookies.session);
    res.send(cart);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post(
  '/add',
  [check('productId').not().isEmpty(), check('quantity').not().isEmpty()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const cart = await getCartBySession(req.cookies.session);

      const row = new CartRow({ cartId: cart.id, ...req.body });
      row.save();
      res.sendStatus(200);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  }
);

router.patch(
  '/',
  [check('productId').not().isEmpty(), check('quantity').not().isEmpty()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const cart = await getCartBySession(req.cookies.session);

      const row = await CartRow.findOne({
        where: { cartId: cart.id, productId: req.body.productId },
      });
      if (row && !(req.body.quantity === 0)) {
        row.quantity = req.body.quantity;
        row.save();
      } else if (row && req.body.quantity === 0) {
        row.destroy();
      } else {
        const temp_row = new CartRow({ cartId: cart.id, ...req.body });
        temp_row.save();
      }
      res.sendStatus(200);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  }
);

router.delete('/:productId', async (req: Request, res: Response) => {
  try {
    const cart = await getCartBySession(req.cookies.session);

    const row = await CartRow.findOne({
      where: { cartId: cart.id, productId: req.params.productId },
    });
    if (row) {
      row.destroy();
      res.sendStatus(200);
    } else {
      res.send(400);
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});
