// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navigation = document.querySelector('.navigation');

const root = document.getElementById('dynamic-root');
const paramSearcher = new URLSearchParams(window.location.search);
const productId = paramSearcher.get('id');

// window.addEventListener("scroll", () => {
//   header.classList.toggle("shadow", window.scrollY > 0);
// })

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navigation.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navigation.classList.remove('active');
};

async function addToCart() {
  if (/(^|;)\s*session=/.test(document.cookie)) {
    const response = await fetch('api/cart/add', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: 1, productId: productId }),
    });

    if (response.status === 400) {
      window.location.href = './loginSignup.html';
    }
  } else {
    window.location.href = './loginSignup.html';
  }
}

async function loadProductDetails() {
  const response = await fetch(`api/products/${productId}`, {
    credentials: 'include',
  });
  const product = await response.json();

  return product;
}

loadProductDetails().then((product) => {
  const template = Handlebars.compile(root.innerHTML);
  const html = template(product);
  root.innerHTML = html;
});
