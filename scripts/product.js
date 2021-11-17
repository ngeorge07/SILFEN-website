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
  const detArrow = details.querySelector("svg");

  description.addEventListener("click", () => {
    document.querySelector("#description-p").classList.toggle("info-active");

    if (descArrow.classList.length === 0) {
      descArrow.classList.add("rotate");
      descArrow.classList.remove("rotate-back");
    } else if (descArrow.classList.contains("rotate")) {
      descArrow.classList.remove("rotate");
      descArrow.classList.add("rotate-back");
    } else if (descArrow.classList.contains("rotate-back")) {
      descArrow.classList.remove("rotate-back");
      descArrow.classList.add("rotate");
    }
  });

  details.addEventListener("click", () => {
    document.querySelector("#details-p").classList.toggle("info-active");

    if (detArrow.classList.length === 0) {
      detArrow.classList.add("rotate");
      detArrow.classList.remove("rotate-back");
    } else if (detArrow.classList.contains("rotate")) {
      detArrow.classList.remove("rotate");
      detArrow.classList.add("rotate-back");
    } else if (detArrow.classList.contains("rotate-back")) {
      detArrow.classList.remove("rotate-back");
      detArrow.classList.add("rotate");
    }
  });
}

infoOpen();
