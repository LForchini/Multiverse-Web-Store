import express, { Request, Response } from "express";
import Cart from "../models/cart.model";
import CartRow from "../models/row.model";

export const router = express.Router({ mergeParams: true });

async function getCartByCookie(cookie: string): Promise<Cart> {
  if (cookie) {
    const cart = await Cart.findOne({ where: { cookie: cookie } });

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

router.post("/add", async (req: Request, res: Response) => {
  const cart = await getCartByCookie(req.cookies.cart);
  res.cookie("cart", cart.cookie);

  const row = new CartRow({ cartId: cart.id, ...req.body });
  row.save();
  res.sendStatus(200);
});
