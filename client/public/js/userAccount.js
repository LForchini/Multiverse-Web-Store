// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navigation = document.querySelector('.navigation');


menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navigation.classList.toggle("active");
}

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navigation.classList.remove("active");
}






