const express = require('express');
const Handlebars = require('handlebars')
const { engine } = require ('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { check, validationResult } = require('express-validator');
const shopJSON = require('./shopJSON');
const port = 3000;
const app = express();

app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', engine({handlebars: allowInsecurePrototypeAccess(Handlebars), extname: 'hbs', defaultLayout: 'index',
layoutsDir: `${__dirname}/views/layouts`, partialsDir: `${__dirname}/views/partials`}));
app.set('view engine', 'hbs');
app.set("views", "./views");

app.get('/forchini', (req, res) => {
  res.render('main', {items: shopJSON.shopJSONArr});
});

app.get('/forchini/item/:id', (req, res) => {
  const obj = shopJSON.shopJSONArr.find(x => x.id === req.params.id);
  res.render('item', {item: obj});
});

app.get('/forchini/cart', (req, res) => {
  res.render('cart');
});

// lISTENING PORT

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});