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

async function CreateItem() {
  const item = {
    title: document.getElementById('c1').value,
    price: document.getElementById('c2').value,
    images: [
      document.getElementById('c3').value,
      document.getElementById('c4').value,
    ],
    description: document.getElementById('c5').value,
    categoryId: document.getElementById('c6').value,
  };

  await fetch(`/api/products`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
}

async function UpdateItem() {}

async function DeleteItem() {}

async function DeleteUser() {}
