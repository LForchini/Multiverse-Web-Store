import express from "express";
import cookieParser from "cookie-parser";
import { router as ProductRouter } from "./src/routes/product-route";
import { router as CartRouter } from "./src/routes/cart-route";
import { loadFromSeed, sequelize } from "./src/sequelize";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/products", ProductRouter);
app.use("/carts", CartRouter);

app.listen(PORT, async () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Deployed at https://multiverse-store-api.herokuapp.com`);
  } else {
    console.log(`Deployed at http://localhost:${PORT}`);
  }
  await sequelize.sync({ force: true });
  console.log(`Sequelize synced`);
  await loadFromSeed("./seed.json");
  console.log(`Loaded ./seed.json`);
});
