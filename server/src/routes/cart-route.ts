import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Cart from "../models/cart.model";
import CartRow from "../models/row.model";

export const router = express.Router({ mergeParams: true });

async function getCartByCookie(cookie: string): Promise<Cart> {
  if (cookie) {
    const cart = await Cart.findOne({
      where: { cookie: cookie },
      include: [CartRow],
    });

    if (cart) {
      return cart;
    }
  }

  const cart = new Cart();
  cart.generateCookie();
  await cart.save();

  return cart;
}

router.get("/", async (req: Request, res: Response) => {
  const cart = await getCartByCookie(req.cookies.cart);
  res.cookie("cart", cart.cookie).send(cart);
});

router.post(
  "/add",
  [check("productId").not().isEmpty(), check("quantity").not().isEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cart = await getCartByCookie(req.cookies.cart);
    res.cookie("cart", cart.cookie);

    const row = new CartRow({ cartId: cart.id, ...req.body });
    row.save();
    res.sendStatus(200);
  }
);

router.patch(
  "/",
  [check("productId").not().isEmpty(), check("quantity").not().isEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cart = await getCartByCookie(req.cookies.cart);
    res.cookie("cart", cart.cookie);

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
  }
);

router.delete("/:productId", async (req: Request, res: Response) => {
  const cart = await getCartByCookie(req.cookies.cart);
  res.cookie("cart", cart.cookie);

  const row = await CartRow.findOne({
    where: { cartId: cart.id, productId: req.params.productId },
  });
  if (row) {
    row.destroy();
    res.sendStatus(200);
  } else {
    res.send(400);
  }
});
