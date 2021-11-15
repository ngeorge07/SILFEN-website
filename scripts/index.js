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

function burgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
}

function sfButtons() {
  const filterButton = document
    .querySelector("#options")
    .querySelector("button:first-of-type");

  const sortButton = document
    .querySelector("#options")
    .querySelector("button:nth-of-type(2");

  filterButton.addEventListener("click", filterOpen);
  sortButton.addEventListener("click", sortOpen);

  function filterOpen() {
    if (document.querySelector("#sort").classList[1] === "active") {
      document.querySelector("#sort").classList.remove("active");
    }
    document.querySelector("#filter").classList.toggle("active");
  }

  function sortOpen() {
    if (document.querySelector("#filter").classList[1] === "active") {
      document.querySelector("#filter").classList.remove("active");
    }
    document.querySelector("#sort").classList.toggle("active");
  }
}

function removeSf() {
  const removeFilter = document.querySelector("#remove-filter");
  const removeSort = document.querySelector("#remove-sort");

  removeFilter.addEventListener("click", () => {
    const filterInputs = document
      .querySelector("#filter")
      .querySelectorAll("input");
    filterInputs.forEach((e) => {
      if (e.checked) {
        e.checked = false;
        removeFilter.style.display = "none";
      }
    });
  });

  removeSort.addEventListener("click", () => {
    const sortInputs = document
      .querySelector("#sort")
      .querySelectorAll("input");
    sortInputs.forEach((e) => {
      if (e.checked) {
        e.checked = false;
        removeSort.style.display = "none";
      }
    });
  });
}

function showRemoveFilter() {
  const removeFilter = document.querySelector("#remove-filter");
  removeFilter.style.display = "block";
}

function showRemoveSort() {
  const removeFilter = document.querySelector("#remove-sort");
  removeFilter.style.display = "block";
}

burgerMenu();
sfButtons();
removeSf();

let url;

function getData(url) {
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then(showPosts);
}

function showPosts(e) {
  e.forEach((e) => {
    const temp = document.querySelector("template").content;
    const clone = temp.cloneNode(true);

    clone.querySelector("img").src =
      e._embedded["wp:featuredmedia"][0].source_url;
    clone.querySelector("img").alt =
      e._embedded["wp:featuredmedia"][0].alt_text;

    let colors = e.color.split(",");

    for (i = 0; i < colors.length; i++) {
      const newButton = document.createElement("button");
      clone.querySelector(".product-colors").appendChild(newButton);
    }

    if (colors.length === 2) {
      const button1 = clone.querySelector("button:first-of-type");
      const button2 = clone.querySelector("button:nth-of-type(2)");

      button1.style.background = `${colors[0]}`;
      button2.style.background = `${colors[1]}`;

      button1.addEventListener("click", () => {
        button2.style.border = "none";
        button1.style.border = "2px solid black";
      });

      button2.addEventListener("click", () => {
        button1.style.border = "none";
        button2.style.border = "2px solid black";
      });
    } else {
      clone.querySelector(
        "button:first-of-type"
      ).style.background = `${colors[0]}`;
    }

    clone.querySelector(".product-title").textContent = e.title.rendered;
    clone.querySelector(".product-price").textContent = `DKK ${e.price}`;

    document.querySelector("#bags").appendChild(clone);
  });
}

function deleteGrid() {
  if (document.querySelector("#bags")) {
    while (document.querySelector("#bags").firstChild) {
      document
        .querySelector("#bags")
        .removeChild(document.querySelector("#bags").lastChild);
    }
  }
}

function az() {
  deleteGrid();
  url =
    "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&orderby=title&order=asc";
  getData(url);
  document.querySelector("#a-z").removeEventListener("click", az);
  document.querySelector("#z-a").addEventListener("click", za);
}

function za() {
  deleteGrid();
  url =
    "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&orderby=title";
  getData(url);
  document.querySelector("#z-a").removeEventListener("click", za);
  document.querySelector("#a-z").addEventListener("click", az);
}

if (!document.querySelector("#z-a").checked) {
  document.querySelector("#z-a").addEventListener("click", za);
}

if (!document.querySelector("#a-z").checked) {
  document.querySelector("#a-z").addEventListener("click", az);
}

const removeSort = document.querySelector("#remove-sort");
removeSort.addEventListener("click", () => {
  deleteGrid();
  url = "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed";
  getData(url);
  document.querySelector("#z-a").addEventListener("click", za);
  document.querySelector("#a-z").addEventListener("click", az);
});

getData("https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed");
