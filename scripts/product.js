import burgerMenu from "./burger.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag/${id}?_embed`;

function getData(url) {
  //grab data from a previously defined "url" variable
  fetch(url)
    //receive the json file
    .then((response) => response.json())
    //run the "showPosts" function that will receive
    //the information from the json file and append new elements into our HTML
    .then(showProduct);
}

function showProduct(e) {
  console.log(e);
  document.querySelector("#trail-title").textContent = e.title.rendered;
  document.querySelector("h1").textContent = e.title.rendered;

  const imageVar1 = document.querySelector("#front");
  const imageVar2 = document.querySelector("#side");
  const imageVar3 = document.querySelector("#inside");

  imageVar1.src = e._embedded["wp:featuredmedia"][0].source_url;
  imageVar2.src = e.img2.guid;
  imageVar3.src = e.img3.guid;

  document.querySelector("#front").alt =
    e._embedded["wp:featuredmedia"][0].alt_text;

  document.querySelector("#price").textContent = `DKK ${e.price}`;

  let colors = e.color.split(",");
  for (let i = 0; i < colors.length; i++) {
    const newButton = document.createElement("button");
    document.querySelector(".product-colors").appendChild(newButton);
  }

  if (colors.length === 2) {
    const button1 = document.querySelector("button:first-of-type");
    const button2 = document.querySelector("button:nth-of-type(2)");

    button1.style.background = `${colors[0]}`;
    button2.style.background = `${colors[1]}`;

    button1.addEventListener("click", () => {
      button2.style.border = "none";
      button1.style.border = "2px solid black";

      imageVar1.src = e._embedded["wp:featuredmedia"][0].source_url;
      imageVar2.src = e.img2.guid;
      imageVar3.src = e.img3.guid;
    });

    button2.addEventListener("click", () => {
      button1.style.border = "none";
      button2.style.border = "2px solid black";

      imageVar1.src = e.img4.guid;
      imageVar2.src = e.img5.guid;
      imageVar3.src = e.img6.guid;
    });
  } else {
    document.querySelector(
      "button:first-of-type"
    ).style.background = `${colors[0]}`;
  }

  document.querySelector("#description-p").textContent = e.description;
  document.querySelector("#material-p").textContent = `Material: ${e.material}`;
  document.querySelector(
    "#dimension-p"
  ).textContent = `Dimensions: ${e.dimentions}`;
}

getData(url);

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
