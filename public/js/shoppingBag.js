// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navigation = document.querySelector('.navigation');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navigation.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navigation.classList.remove('active');
};

// Items and des

const calcTotalnDel = (subtotal) => {
  const delivery = document.getElementById('delivery-price');
  const total = document.getElementById('total-price');
  const deliwp = delivery.innerHTML.replace('£', '');
  total.innerHTML = `£${subtotal + parseFloat(deliwp)}`;
};

const calcTotal = () => {
  const tp = document.getElementById('subtotal-price');
  let children = document.getElementById('recyclerView-row').children;
  let sum = 0;

  for (var i = 0; i < children.length; i++) {
    if (children[i].id.substring(0, 3) === 'img') {
      const st = document.getElementById(`st${children[i].id.substring(4, 5)}`);
      sum += parseFloat(st.innerHTML.substring(1));
    }
  }
  tp.innerHTML = `£${Math.round(sum * 100) / 100}`;

  calcTotalnDel(Math.round(sum * 100) / 100);
};

async function getCart() {
  if (/(^|;)\s*session=/.test(document.cookie)) {
    const response = await fetch('api/cart/', { credentials: 'include' });

    if (response.status === 400) {
      window.location.href = './loginSignup.html';
    } else {
      const cart = await response.json();
      return cart;
    }
  } else {
    window.location.href = './loginSignup.html';
  }
}

getCart().then((cart) => {
  const fContainer = document.getElementById('recyclerView-row');

  cart.rows.forEach((result, idx) => {
    const content = `
  <div class="col-lg-5 col-md-6" id="img-${idx}">
  <div class="filter-card rcard">
    <div class="rec-img-cont">
    <div class="rec-img"><img src=${result.product.images[0].image}  alt="">
    </div>
    </div>
  </div>
</div>

<div class="col-lg-4 col-md-5" id="des-${idx}">
  <div class="filter-card rcard">
    <h2 class="rec-h2"><strong>${result.product.title}</strong></h2>
      <h2 class="price" id="p${idx}">£${result.product.price}</h2>
    <div class="price-n-pref">
      <div class="preference">
        <label for="quantity">Quantity</label>
        <input type="text" name="quantity" id="q${idx}" value="${result.quantity}" onchange="quantChanged(this)">
    </div>
      <h2 class="subtotal" id="st${idx}">£${result.product.price} </h2>
    </div>
    <h2 class="remove" id="r${idx}" onclick="remove(this)">remove</h2>
  </div>
</div>
  `;
    fContainer.insertAdjacentHTML('afterbegin', content);
  });

  calcTotal();
});

function remove(h2) {
  document.getElementById(`img-${h2.id.substring(1)}`).remove();
  document.getElementById(`des-${h2.id.substring(1)}`).remove();
  calcTotal();
}

function quantChanged(input) {
  if (parseInt(input.value) === 0 || input.value === '') input.value = '1';
  const val = input.id.substring(1);
  const p = document.getElementById(`p${val}`);
  const st = document.getElementById(`st${val}`);
  let pwp = p.innerHTML.replace('£', '');
  console.log(pwp);
  st.innerHTML = `£${pwp * input.value}`;
  calcTotal();
}
