
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

const jewelArr = [
  {name: "Sparkling Statement Halo Stud Earrings", img1: "290040C01_RGB.JPG?sw=1000&sh=1000&sm=fit&sfrm=png&bgcolor=F5F5F5", price: "£800"},   
  {name: "January Birthstone Heart Dangle Charm", img1: "798854C08_RGB.JPG?sw=1000&sh=1000&sm=fit&sfrm=png&bgcolor=F5F5F5", price: "£300"},  
  {name: "14k White Gold 1.00 Carat Ring", img1: "159451C01_RGB.JPG?sw=1000&sh=1000&sm=fit&sfrm=png&bgcolor=F5F5F5", price: "£1350"},  
  {name: "Timeless Wish Sparkling Heart Ring", img1: "169302C01_RGB.JPG?sw=1000&sh=1000&sm=fit&sfrm=png&bgcolor=F5F5F5", price: "£680"},  
  {name: "Sterling Silver 0.25 Carat Pendant & Necklace", img1: "399463C01_RGB.JPG?sw=1000&sh=1000&sm=fit&sfrm=png&bgcolor=F5F5F5", price: "£970"}
];


const container2 = document.getElementById('sw2');

jewelArr.forEach((result, idx) => {
  const content = `
  <div class="box">
  <div class="box-img">
    <a href="item.html"><img src="https://uk.pandora.net/dw/image/v2/AAKS_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwfa8378cb/images/productimages/main/${result.img1}" alt=""></a>
  </div>
  <h3>${result.name}</h3>
  <h3 class="price">${result.price}</h3>
</div>
  `;
  container2.insertAdjacentHTML("beforeend", content);
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


