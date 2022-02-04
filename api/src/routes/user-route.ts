import express from 'express';
import Cart from '../models/cart.model';
import User, { UserTypes } from '../models/user.model';
import { check, validationResult } from 'express-validator';

export const router = express.Router({ mergeParams: true });

export async function getRequester(session: string) {
  if (!session) {
    throw new Error('No current session');
  }

  const requester = await User.findOne({ where: { session: session } });

  if (!requester) {
    throw new Error('Session not found');
  }

  return requester;
}

router.get('/', async (req, res) => {
  try {
    const requester = await getRequester(req.cookies.session);

    if (requester.type === UserTypes.ADMIN) {
      res.send(await User.findAll());
    } else {
      res.send(requester);
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

/**
 * If requester is CUSTOMER and id == requester.id, send requester info
 * If requester is ADMIN send User with id
 * Otherwise send permission denied error
 */
router.get('/:id', async (req, res) => {
  try {
    const requester = await getRequester(req.cookies.session);

    if (requester.id.toString() === req.params.id) {
      res.send(requester);
    } else if (requester.type === UserTypes.ADMIN) {
      const user = await User.findByPk(req.params.id);
      res.send(user);
    } else {
      throw new Error('Permission denied');
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

/**
 * Same formula as GET /:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const requester = await getRequester(req.cookies.session);

    if (requester.id.toString() === req.params.id) {
      requester.destroy();
      res.sendStatus(200);
    } else if (requester.type === UserTypes.ADMIN) {
      const user = await User.findByPk(req.params.id);
      user?.destroy();
      res.sendStatus(200);
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
    check('email').normalizeEmail().isEmail(),
    check('password').isHash('sha256'),
    check('name').isAscii(),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const requester = await getRequester(req.cookies.session);

      if (requester.id.toString() === req.params.id) {
        if (req.body.email) requester.email = req.body.email;
        if (req.body.password) requester.password = req.body.password;
        await requester.save();
        res.send(requester);
      } else if (requester.type === UserTypes.ADMIN) {
        const user = await User.findByPk(req.params.id);
        if (user) {
          if (req.body.email) user.email = req.body.email;
          if (req.body.password) user.password = req.body.password;
          if (req.body.name) user.name = req.body.name;
          await user.save();
          res.send(user);
        } else {
          throw new Error('User not found');
        }
      } else {
        throw new Error('Permission denied');
      }
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  }
);

/**
 * req.body must be in the form {email, hashedPassword}
 */
router.post(
  '/login',
  [check('email').isEmail(), check('password').isHash('sha256')],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;
    const user = await User.findOne({
      where: { email: data.email, password: data.password },
    });

    if (user) {
      user.generateSession();
      await user.save();
      res.cookie('session', user.session);
      res.send(user);
    } else {
      res.status(400).send('User not found');
    }
  }
);

router.post('/logout', async (req, res) => {
  try {
    const requester = await getRequester(req.cookies.session);
    requester.session = null;
    requester.save();
    res.cookie('session', 'null', { maxAge: 0 });
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post(
  '/',
  [
    check('email').isEmail(),
    check('password').isHash('sha256'),
    check('password').notEmpty(),
    check('name').isAscii(),
    check('name').notEmpty(),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;
    const user_data = {
      email: data.email,
      password: data.password,
      name: data.name,
      type: UserTypes.CUSTOMER,
    };
    const user = new User(user_data);
    user.generateSession();
    await user.save();
    await user.reload();
    res.cookie('session', user.session);
    const cart = new Cart({ userId: user.id });
    cart.save();
    res.send(user);
  }
);
