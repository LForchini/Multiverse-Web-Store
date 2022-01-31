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
};

let API_URL;
if (window.location.hostname === "localhost") {
  API_URL = "http://localhost:3001";
} else {
  API_URL = "https://multiverse-store-api";
}

async function loadArr() {
  const response = await fetch(`${API_URL}/carts`, {
    headers: {
      //'mode': 'no-cors'
      cookie: document.cookie,
    },
    credentials: "include",
  });
  const cart = await response.json();

  console.log(document.cookie);
  return cart.rows;
}

loadArr().then((filterArr) => {
  const fContainer = document.getElementById("recyclerView-row");

  filterArr.forEach(async (res, idx) => {
    const response = await fetch(`${API_URL}/products/${res.productId}`);
    const result = await response.json();

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
      <h2 class="rec-h2">${result.title} </h2>
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
});

function remove(h2) {
  document.getElementById(`img-${h2.id.substring(1)}`).remove();
  document.getElementById(`des-${h2.id.substring(1)}`).remove();
  calcTotal();
}

function quantChanged(input) {
  if (parseInt(input.value) === 0) input.value = "1";
  const val = input.id.substring(1);
  const p = document.getElementById(`p${val}`);
  const st = document.getElementById(`st${val}`);
  let pwp = p.innerHTML.replace("£", "");
  st.innerHTML = `£${pwp * input.value}`;
  calcTotal();
}
