const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");

/* 移动端导航 */
navToggle.addEventListener("click", () => {
  siteNav.classList.toggle("open");

  const isOpen = siteNav.classList.contains("open");
  navToggle.textContent = isOpen ? "×" : "☰";
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.textContent = "☰";
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* 导航栏滚动状态 + 返回顶部按钮 */
function updateScrollUI() {
  const scrolled = window.scrollY > 20;

  siteHeader.classList.toggle("is-scrolled", scrolled);

  if (window.scrollY > 520) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

/* 返回顶部 */
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* 滚动进入动画 */
const animatedElements = document.querySelectorAll("[data-animate]");

animatedElements.forEach((element, index) => {
  const delay = Math.min(index * 70, 420);
  element.style.setProperty("--delay", `${delay}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px",
  }
);

animatedElements.forEach((element) => {
  revealObserver.observe(element);
});

/* 当前导航高亮 */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${id}`);
      });
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* 卡片轻微视差：让 hover 更自然 */
const hoverCards = document.querySelectorAll(
  ".research-card, .member-card, .news-card, .publication-item, .hero-card"
);

hoverCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -3;
    const rotateY = ((x / rect.width) - 0.5) * 3;

    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
