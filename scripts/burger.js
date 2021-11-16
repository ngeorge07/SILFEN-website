export default function burgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      document.querySelector("nav").style.backdropFilter = "none";
      document.querySelector("nav").style.background = "white";
    }

    if (!navMenu.classList.contains("active")) {
      document.querySelector("nav").style.backdropFilter = "blur(8.3px)";
      document.querySelector("nav").style.background =
        "rgba(255, 255, 255, 0.3)";
    }
  }
}
