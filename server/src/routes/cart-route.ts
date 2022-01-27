import express, { Request, Response } from "express";
import Cart from "../models/cart.model";

export const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request, res: Response) => {
  if (req.cookies.cart) {
    const cart = await Cart.findOne({ where: { cookie: req.cookies.cart } });

    if (cart) {
      res.send(cart);
      return;
    }
  }

  const cart = new Cart();
  const cookie = cart.generateCookie();
  await cart.save();

  res.cookie("cart", cookie);
  res.send(cart);
});
