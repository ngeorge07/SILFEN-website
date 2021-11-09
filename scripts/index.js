const swiper = new Swiper(".swiper", {
  // And if we need scrollbar

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.6,
      spaceBetween: 20,
    },
    // 430: {
    //   slidesPerView: 2.3,
    //   spaceBetween: 20,
    // },
    480: {
      slidesPerView: 2.6,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    880: {
      slidesPerView: 3.5,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    1150: {
      slidesPerView: 4.5,
      spaceBetween: 30,
    },
  },
  freeMode: {
    enabled: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
