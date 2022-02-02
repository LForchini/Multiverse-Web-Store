
// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
})

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
}

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
}

// Cycle content for disply to slideshow

const homeContents = [
  {category: "Women's Jewellery", cp1: "Shine bright like a", cp2: "diamond",img: "jewellerywomen", link: "womensjewellery.html"},
  {category: "Women's Clothing", cp1: "Elegance never", cp2: "ends",img: "clothingwomen", link: "#"},
  {category: "Men's Jewellery", cp1: "A time to look", cp2: "classic",img: "jewellerymen", link: "#"},
  {category: "Electronics", cp1: "The best modern", cp2: "accessories",img: "headphones", link: "#"}
];


const container = document.getElementById('sw');

homeContents.forEach((result, idx) => {
  const content = `
  <div class="swiper-slide container">
  <img src="/Images/${result.img}.jpg" alt="">
  <div class="home-text">
    <span>${result.category}</span>
    <h1>${result.cp1}<br>${result.cp2}</h1>
    <a href="${result.link}" class="btn btn-shop">Shop now for ${result.category.toLowerCase()}</a>
  </div>
</div>
  `;
  container.insertAdjacentHTML("beforeend", content);
});


// Section 2 gridview for clothing

const contents2 = [{img: "clothingmen2", btn: "M"}, {img: "clothingwomen3", btn: "Wom"}]
const container2 = document.getElementById('sw-clothing');

contents2.forEach((result, idx) => {
  const content = `
  <div class="box">
  <h1 class="btn" id=${result.btn}>${result.btn}en's clothing</h1>
  <div class="box-img">
    <img src="/Images/${result.img}.jpg" alt="">
  </div>
</div>
  `;
  container2.insertAdjacentHTML("beforeend", content);
});

// Section 3 gridview for jewellery

const contents3 = [{img: "jewellerywomen3", btn: "Wom", link: "womensjewellery.html"}, {img: "jewellerymen4", btn: "M", link: "#"}]
const container3 = document.getElementById('sw-jewellery');

contents3.forEach((result, idx) => {
  const content = `
  <div class="box">
  <h1 class="btn" id=${result.btn}>${result.btn}en's jewellery</h1>
  <a href="${result.link}">
  <div class="box-img">
    <img src="/Images/${result.img}.jpg" alt="">
  </div>
  </a>
</div>
  `;
  container3.insertAdjacentHTML("beforeend", content);
});

// Section 3 gridview for jewellery

const contents4 = [{img: "phone", btn: "Phones"}, {img: "headphones2", btn: "Headphones"},
{img: "tv", btn: "TVs"}, {img: "laptop", btn: "Laptops"}]
const container4 = document.getElementById('sw-electronics');

contents4.forEach((result, idx) => {
  const content = `
  <div class="box">
  <h1 class="btn" id=${result.btn}>${result.btn}</h1>
  <div class="box-img">
    <img src="/Images/${result.img}.jpg" alt="">
  </div>
</div>
  `;
  container4.insertAdjacentHTML("beforeend", content);
});


// Swiper Slideshow

var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


