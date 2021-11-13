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

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const remove = document.querySelector(".remove");
remove.addEventListener("click", () => {
  const inputs = document
    .querySelector(".filter-opt")
    .querySelectorAll("input");
  inputs.forEach((e) => {
    if (e.checked) {
      e.checked = false;
    }
  });
});

const filterButton = document
  .querySelector("#options")
  .querySelector("button:first-of-type");

const sortButton = document
  .querySelector("#options")
  .querySelector("button:nth-of-type(2");

filterButton.addEventListener("click", filterOpen);

function filterOpen() {
  if (document.querySelector(".sort-opt").classList[1] === "active") {
    document.querySelector(".sort-opt").classList.remove("active");
  }
  document.querySelector(".filter-opt").classList.toggle("active");
}

sortButton.addEventListener("click", sortOpen);

function sortOpen() {
  if (document.querySelector(".filter-opt").classList[1] === "active") {
    document.querySelector(".filter-opt").classList.remove("active");
  }
  document.querySelector(".sort-opt").classList.toggle("active");
}
