import burgerMenu from "./burger.js";

burgerMenu();

const swiper = new Swiper(".product-swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function infoOpen() {
  const description = document.querySelector("#description");
  const details = document.querySelector("#details");
  const descArrow = description.querySelector("svg");
  const detArrow = document.querySelector("svg");

  description.addEventListener("click", () => {
    document.querySelector("#description-p").classList.toggle("info-active");
    if (descArrow.classList.contains != "rotate") {
      console.log("it works");
      descArrow.classList.add("rotate");
    }
  });

  details.addEventListener("click", () => {
    document.querySelector("#details-p").classList.toggle("info-active");
  });
}

infoOpen();
