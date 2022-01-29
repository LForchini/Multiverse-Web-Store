console.log("Okay this shows");

const calcTotal = () => {

  const tp = document.getElementById("total-price");
  let children = document.getElementById("recyclerView-row").children;
  let sum = 0;

  for (var i = 0; i < children.length; i++) {
    if (children[i].id.substring(0, 3) === "img") {
      const st = document.getElementById(`st${children[i].id.substring(4, 5)}`);
      sum += parseFloat(st.innerHTML.substring(1));
    }
  }
  tp.innerHTML = `£${Math.round(sum * 100) / 100}`;
}

const filterArr = [{
  name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  price: 109.95
}, {
  name: "Mens Casual Premium Slim Fit T-Shirts",
  image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  price: 22.3
}, {
  name: "Mens Cotton Jacket",
  image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  price: 55.99
}];

const fContainer = document.getElementById('recyclerView-row');

filterArr.forEach((result, idx) => {
  const content = `
  <div class="col-lg-5 col-md-6" id="img-${idx}">
  <div class="filter-card rcard">
    <div class="rec-img-cont">
    <div class="rec-img"><img src=${result.image}  alt="">
    </div>
    </div>
  </div>
</div>

<div class="col-lg-4 col-md-5" id="des-${idx}">
  <div class="filter-card rcard">
    <h2 class="rec-h2">${result.name} </h2>
      <h2 class="price" id="p${idx}">£${result.price}</h2>
    <div class="price-n-pref">
      <div class="preference">
        <label for="quantity">Quantity</label>
        <input type="text" name="quantity" id="q${idx}" value="1" onchange="quantChanged(this)">
    </div>
      <h2 class="subtotal" id="st${idx}">£${result.price} </h2>
    </div>
    <h2 class="remove" id="r${idx}" onclick="remove(this)">remove item completely</h2>
  </div>
</div>
  `;
  fContainer.insertAdjacentHTML("afterbegin", content);
});

calcTotal();

function remove(h2) {
  document.getElementById(`img-${h2.id.substring(1)}`).remove();
  document.getElementById(`des-${h2.id.substring(1)}`).remove();
  calcTotal();
}

function quantChanged(input) {
  if (parseInt(input.value) === 0) input.value = "1";
  const val = input.id.substring(1)
  const p = document.getElementById(`p${val}`);
  const st = document.getElementById(`st${val}`);
  let pwp = p.innerHTML.replace("£", "");
  st.innerHTML = `£${pwp * input.value}`;
  calcTotal();
}




