import express from 'express';
import cookieParser from 'cookie-parser';
import { router as ProductRouter } from './src/routes/product-route';
import { router as CartRouter } from './src/routes/cart-route';
import { router as UserRouter } from './src/routes/user-route';
import { router as CategoryRouter } from './src/routes/category-route';

export const app = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/products', ProductRouter);
app.use('/cart', CartRouter);
app.use('/users', UserRouter);
app.use('/categories', CategoryRouter);
