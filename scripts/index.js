import burgerMenu from "./burger.js";

const swiper = new Swiper(".index-swiper", {
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
  //grab data from a previously defined "url" variable
  fetch(url)
    //receive the json file
    .then((response) => response.json())
    //run the "showPosts" function that will receive
    //the information from the json file and append new elements into our HTML
    .then(showPosts);
}

function showPosts(e) {
  e.forEach((e) => {
    const temp = document.querySelector("template").content;
    const clone = temp.cloneNode(true);

    const imageVar = clone.querySelector("img");
    imageVar.src = e._embedded["wp:featuredmedia"][0].source_url;
    imageVar.alt = e._embedded["wp:featuredmedia"][0].alt_text;
    imageVar.setAttribute(
      "aria-label",
      `See more details about ${e.title.rendered}`
    );

    let colors = e.color.split(",");

    for (let i = 0; i < colors.length; i++) {
      const newButton = document.createElement("button");
      clone.querySelector(".product-colors").appendChild(newButton);
    }

    if (colors.length === 2) {
      const button1 = clone.querySelector("button:first-of-type");
      const button2 = clone.querySelector("button:nth-of-type(2)");

      button1.style.background = `${colors[0]}`;
      button2.style.background = `${colors[1]}`;

      button1.setAttribute("aria-label", "Color 1");
      button2.setAttribute("aria-label", "Color 2");

      button1.addEventListener("click", () => {
        button2.style.border = "none";
        button1.style.border = "2px solid black";

        imageVar.src = e._embedded["wp:featuredmedia"][0].source_url;
      });

      button2.addEventListener("click", () => {
        button1.style.border = "none";
        button2.style.border = "2px solid black";

        imageVar.src = e.img.guid;
      });
    } else {
      clone
        .querySelector("button:first-of-type")
        .setAttribute("aria-label", "Color 1");
      clone.querySelector(
        "button:first-of-type"
      ).style.background = `${colors[0]}`;
    }

    clone.querySelector(".product-title").textContent = e.title.rendered;
    clone
      .querySelector(".product-title")
      .setAttribute("aria-label", `See more details about ${e.title.rendered}`);

    clone
      .querySelector(".product-title")
      .setAttribute("href", `product.html?id=${e.id}`);
    clone
      .querySelector(".image-link")
      .setAttribute("href", `product.html?id=${e.id}`);

    clone.querySelector(".product-price").textContent = `DKK ${e.price}`;

    document.querySelector("#bags").appendChild(clone);
  });

  console.log(
    document.querySelector(".product").querySelector("a:first-of-type")
  );
  console.log(document.querySelector("h3").querySelector("a:first-of-type"));
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

// sort alphabetically from a-z
function sortAlpha() {
  // declare a function called az() that will check what data we have already
  function az() {
    // if our data contains only bags made out of polyurethane
    if (document.querySelector("#polyurethane").checked) {
      // run a function that will delete the data shown
      deleteGrid();

      // and replace it with data based on bags made out of polyurethane
      // that are ordered alphabetically from a-z
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=4&orderby=title&order=asc";

      // run a function that will use the new data and show it to the user
      getData(url);

      // add an event listener that will allow the user to click on the sort from z-a option
      // and run a function to grab and manipulate the new data
      document.querySelector("#z-a").addEventListener("click", za);
    }

    //repeat for bags made out of rPET ordered from a-z
    else if (document.querySelector("#material2").checked) {
      console.log("m1 a-z");
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=2&orderby=title&order=asc";
      getData(url);
      document.querySelector("#z-a").addEventListener("click", za);
    } else {
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&orderby=title&order=asc";
      getData(url);
      document.querySelector("#a-z").removeEventListener("click", az);
      document.querySelector("#z-a").addEventListener("click", za);
    }
    document.querySelector("#a-z").removeEventListener("click", az);
    showRemoveSort();
  }

  function za() {
    if (document.querySelector("#polyurethane").checked) {
      console.log("m1 z-a");
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=4&orderby=title&order=desc";
      getData(url);
      document.querySelector("#a-z").addEventListener("click", az);
    } else if (document.querySelector("#material2").checked) {
      console.log("m1 z-a");
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=2&orderby=title&order=desc";
      getData(url);
      document.querySelector("#a-z").addEventListener("click", az);
    } else {
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&orderby=title&order=desc";
      getData(url);
      document.querySelector("#z-a").removeEventListener("click", za);
      document.querySelector("#a-z").addEventListener("click", az);
    }
    document.querySelector("#z-a").removeEventListener("click", za);
    showRemoveSort();
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
    if (document.querySelector("#polyurethane").checked) {
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=4";
      getData(url);
    } else if (document.querySelector("#material2").checked) {
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=2";
      getData(url);
    } else {
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed";
      getData(url);
    }
    document.querySelector("#z-a").addEventListener("click", za);
    document.querySelector("#a-z").addEventListener("click", az);
  });
}

function filterMaterial() {
  if (!document.querySelector("#polyurethane").checked) {
    document.querySelector("#polyurethane").addEventListener("click", poly);
  }
  function poly() {
    if (document.querySelector("#a-z").checked) {
      console.log("a-z m1");
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=4&orderby=title&order=asc";
      getData(url);
      document.querySelector("#material2").addEventListener("click", rpet);
    } else if (document.querySelector("#z-a").checked) {
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=4&orderby=title&order=desc";
      getData(url);
      document.querySelector("#material2").addEventListener("click", rpet);
    } else {
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=4";
      getData(url);
      // document.querySelector("#polyurethane").removeEventListener("click", poly);
      document.querySelector("#material2").addEventListener("click", rpet);
    }
    document.querySelector("#polyurethane").removeEventListener("click", poly);
    showRemoveFilter();
  }

  if (!document.querySelector("#material2").checked) {
    document.querySelector("#material2").addEventListener("click", rpet);
  }

  function rpet() {
    if (document.querySelector("#a-z").checked) {
      console.log("a-z m2");
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=2&orderby=title&order=asc";
      getData(url);
      document.querySelector("#polyurethane").addEventListener("click", poly);
    } else {
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=2";
      getData(url);
      // document.querySelector("#material2").removeEventListener("click", rpet);
      document.querySelector("#polyurethane").addEventListener("click", poly);
    }
    document.querySelector("#material2").removeEventListener("click", rpet);
    showRemoveFilter();
  }

  const removeFilter = document.querySelector("#remove-filter");
  removeFilter.addEventListener("click", () => {
    deleteGrid();
    if (document.querySelector("#a-z").checked) {
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&orderby=title&order=asc";
      getData(url);
    } else if (document.querySelector("#z-a").checked) {
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&orderby=title&order=desc";
      getData(url);
    } else {
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed";
      getData(url);
    }
    document.querySelector("#polyurethane").addEventListener("click", poly);
    document.querySelector("#material2").addEventListener("click", rpet);
  });
}

function filterPrice() {
  if (!document.querySelector("#cheap").checked) {
    document.querySelector("#cheap").addEventListener("click", cheap);
  }

  function cheap(url) {
    if (document.querySelector("#polyurethane").checked) {
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=6";
      getData(url);
      document.querySelector("#expensive").addEventListener("click", expensive);
      document.querySelector("#cheap").removeEventListener("click", cheap);
    } else {
      deleteGrid();
      url =
        "https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed&categories=6&categories=4";
      getData(url);
      document.querySelector("#expensive").addEventListener("click", expensive);
    }

    document.querySelector("#cheap").removeEventListener("click", cheap);
  }

  function expensive() {}
}

getData("https://georgendesign.com/silfen-wordpress/wp-json/wp/v2/bag?_embed");
sortAlpha();
filterMaterial();
filterPrice();
