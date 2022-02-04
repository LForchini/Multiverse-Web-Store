import express from 'express';
import { app as API_Router } from './api/api-controller';
import cookieParser from 'cookie-parser';
import { sequelize, loadFromSeed } from './api/src/sequelize';

const port = 3000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', API_Router);

app.listen(port, async () => {
  console.log(`Deployed at http://localhost:${port}`);
  await sequelize.sync({ force: true });
  console.log(`Sequelize synced`);
  await loadFromSeed('./seed.json');
  console.log(`Loaded ./seed.json`);
});
