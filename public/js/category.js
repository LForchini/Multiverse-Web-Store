// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

const root = document.getElementById('dynamic-root');
const paramSearcher = new URLSearchParams(window.location.search);
const categoryId = paramSearcher.get('id');

window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
};

async function getCategoryData() {
  const response = await fetch(`api/categories/${categoryId}`, {
    credentials: 'include',
  });
  const category = await response.json();
  return category;
}

getCategoryData().then((categoryData) => {
  const container2 = document.getElementById('sw2');
  categoryData.members.forEach((result) => {
    const content = `
  <div class="box">
  <div class="box-img">
    <a href="item.html?id=${result.id}">
    <img src="${result.images[0].image}" alt=""></a>
  </div>
  <h3>${result.title}</h3>
  <h3 class="price">£${result.price}</h3>
</div>
  `;
    container2.insertAdjacentHTML('beforeend', content);
  });

  categoryData.tagline = categoryData.tagline
    ? categoryData.tagline
    : 'CREATE CATEGORY TAGLINE';

  const template = Handlebars.compile(root.innerHTML);
  const html = template(categoryData);
  root.innerHTML = html;
});

// Swiper Slideshow

var swiper = new Swiper('.home', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
