// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navigation = document.querySelector('.navigation');
const root = document.querySelector('.recyclerView-container');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navigation.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navigation.classList.remove('active');
};

async function deleteAccount() {
  throw new Error('To DO');
}

async function getUserData() {
  const response = await fetch(`api/users`, {
    credentials: 'include',
  });

  if (response.status === 400) {
    window.location.href = 'loginSignup.html';
  } else {
    const user = await response.json();

    return user;
  }
}

async function logout() {
  fetch(`api/users/logout`, {
    credentials: 'include',
    method: 'POST',
  });
}

getUserData().then((user) => {
  const html = `<div class="filter-card rcard">
  <div class="price-n-pref-chk">
    <h2 class="chk-tot">
      <strong>Name</strong>
    </h2>
    <h2 class="price" id="subtotal-price">
      ${user.name}
    </h2>
  </div>
  <div class="price-n-pref-chk">
    <h2 class="chk-tot">
      <strong>User Id</strong>
    </h2>
    <h2 class="price" id="delivery-price">
      #${user.id}
    </h2>
  </div>

  <div class="price-n-pref-chk">
    <h2 class="chk-tot">
      <strong>Email</strong>
    </h2>
    <h2 class="price" id="total-price">
      ${user.email}
    </h2>
  </div>
  <h2 class="remove" onclick="deleteAccount()">
    <a > delete account</a>
  </h2>
</div>`;
  root.innerHTML = html;
});
