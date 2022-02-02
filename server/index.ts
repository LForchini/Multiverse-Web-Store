import express from 'express';
import cookieParser from 'cookie-parser';
import { router as ProductRouter } from './src/routes/product-route';
import { router as CartRouter } from './src/routes/cart-route';
import { router as UserRouter } from './src/routes/user-route';
import { loadFromSeed, sequelize } from './src/sequelize';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  const origin =
    req.headers.origin == 'http://localhost:3000'
      ? 'http://localhost:3000'
      : 'https://multiverse-store-api.herokuapp.com';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/products', ProductRouter);
app.use('/cart', CartRouter);
app.use('/users', UserRouter);

app.listen(PORT, async () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Deployed at https://multiverse-store-api.herokuapp.com`);
  } else {
    console.log(`Deployed at http://localhost:${PORT}`);
  }
  await sequelize.sync({ force: true });
  console.log(`Sequelize synced`);
  await loadFromSeed('./seed.json');
  console.log(`Loaded ./seed.json`);
});
