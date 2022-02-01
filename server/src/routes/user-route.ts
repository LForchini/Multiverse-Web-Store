import express from 'express';
import Cart from '../models/cart.model';
import User, { UserTypes } from '../models/user.model';
import { check, validationResult } from 'express-validator';

export const router = express.Router({ mergeParams: true });

async function getRequester(session: string) {
  const requester = await User.findOne({ where: { session: session } });

  if (!requester) {
    throw new Error('Session not found');
  }

  return requester;
}

router.get('/', async (req, res) => {
  try {
    const requester = await getRequester(req.cookies.session);
    res.send(requester);
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

router.post('/', async (req, res) => {
  throw new Error('Not implemented');
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

router.patch('/:id', async (req, res) => {
  const data = req.body;
  try {
    const requester = await getRequester(req.cookies.session);

    if (requester.id.toString() === req.params.id) {
      data.keys.array.forEach((element: string) => {
        requester.set(element, data[element]);
      });
      await requester.save();
      res.send(requester);
    } else if (requester.type === UserTypes.ADMIN) {
      const user = await User.findByPk(req.params.id);
      data.keys.array.forEach((element: string) => {
        user?.set(element, data[element]);
      });
      await user?.save();
      res.send(user);
    } else {
      throw new Error('Permission denied');
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

/**
 * req.body must be in the form {username, hashedPassword}
 */
router.post('/login', async (req, res) => {
  const data = req.body;
  const user = await User.findOne({
    where: { username: data.username, password: data.password },
  });

  if (user) {
    user.generateSession();
    await user.save();
    res.cookie('session', user.session);
    res.send(user);
  } else {
    res.status(400).send('User not found');
  }
});

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

router.get('/register', async (req, res) => {
  const data = req.body;
  const user_data = { username: data.username, password: data.password };
  const user = new User(user_data);
  user.generateSession();
  await user.save();
  const cart = new Cart({ userId: user.id });
  cart.save();

  res.send(user);
});
