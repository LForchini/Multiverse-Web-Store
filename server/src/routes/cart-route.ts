import e from "express";
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

  if (req.body.productId && req.body.quantity) {
    const row = new CartRow({ cartId: cart.id, ...req.body });
    row.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

router.patch("/", async (req: Request, res: Response) => {
  const cart = await getCartByCookie(req.cookies.cart);
  res.cookie("cart", cart.cookie);

  if (req.body.productId && req.body.quantity) {
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
  } else {
    res.sendStatus(400);
  }
});

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
