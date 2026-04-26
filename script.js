const pageLoader = document.querySelector(".page-loader");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (pageLoader) {
      pageLoader.remove();
    }
  }, 1200);
});

/* mobile nav */
navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");

  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* header state and back-to-top */
function updateScrollUI() {
  const isScrolled = window.scrollY > 18;
  siteHeader.classList.toggle("is-scrolled", isScrolled);

  if (window.scrollY > 560) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* reveal on scroll */
const animatedElements = document.querySelectorAll("[data-animate]");

animatedElements.forEach((element, index) => {
  const delay = Math.min(index * 55, 360);
  element.style.setProperty("--delay", `${delay}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -70px 0px",
  }
);

animatedElements.forEach((element) => {
  revealObserver.observe(element);
});

/* active navigation */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (!visibleEntries.length) return;

    const currentId = visibleEntries[0].target.getAttribute("id");

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  },
  {
    threshold: [0.25, 0.45, 0.65],
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* card motion */
const motionCards = document.querySelectorAll(
  ".hero-panel, .research-card, .person-card, .publication-card, .news-item, .intro-cards article"
);

motionCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.matchMedia("(max-width: 1020px)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -2.4;
    const rotateY = ((x / rect.width) - 0.5) * 2.4;

    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
