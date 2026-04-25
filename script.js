const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");

navToggle.addEventListener("click", () => {
  siteNav.classList.toggle("open");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
