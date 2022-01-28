const express = require('express');
const Handlebars = require('handlebars')
const { engine } = require ('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const fetch = require( 'node-fetch');

const port = 3000;
const app = express();

const PRODUCTION_API_URL = "https://multiverse-store-api.herokuapp.com"
const LOCAL_API_URL = "http://localhost:3001"
const API_URL = process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : LOCAL_API_URL;

app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', engine({handlebars: allowInsecurePrototypeAccess(Handlebars), extname: 'hbs', defaultLayout: 'index',
layoutsDir: `${__dirname}/views/layouts`, partialsDir: `${__dirname}/views/partials`}));
app.set('view engine', 'hbs');
app.set("views", "./views");

async function getAPIData(path) {
  const response = await fetch(`${API_URL}${path}`)
  const json = await response.json();
  return json;
}

app.get('/', async (req, res) => {
  res.render('main', {items: await getAPIData('/products')});
});

app.get('/item/:id', async (req, res) => {
  const obj = await getAPIData(`/products/${req.params.id}`)
  res.render('item', {item: obj});
});

app.get('/cart', (req, res) => {
  res.render('cart');
});

// lISTENING PORT

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});