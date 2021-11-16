import burgerMenu from "./burger.js";

burgerMenu();

const swiper = new Swiper(".product-swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
