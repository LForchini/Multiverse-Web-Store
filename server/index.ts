import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, async () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Deployed at https://multiverse-store-api.herokuapp.com`);
  } else {
    console.log(`Deployed at http://localhost:${PORT}`);
  }
});
