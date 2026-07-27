const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");

/* === Scroll events === */

window.addEventListener("scroll", onScroll);
onScroll();

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(skills);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(contact);
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionBoundaries =
    targetLine >= sectionTop && sectionTop + sectionHeight > targetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

/* === Mobile menu === */

document.querySelectorAll(".open").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.classList.add("menu-expanded");
  });
});

document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.classList.remove("menu-expanded");
  });
});

/* === ScrollReveal === */

ScrollReveal({
  origin: "bottom",
  distance: "30px",
  duration: 800,
  reset: false,
}).reveal(
  `#home .hero-content,
   #home .hero-terminal,
   #about .section-header,
   #about .about-grid,
   #skills .section-header,
   #skills .skills-highlight,
   #skills .skill-category,
   #projects .section-header,
   #projects .project-card,
   #contact .section-header,
   #contact .contact-grid`
);

/* === Build project cards === */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards");

  projetos.forEach((p) => {
    const card = document.createElement("div");
    card.className = "project-card";

    const techTags = p.tecnologias.split(" - ").map((t) => `<span>${t.trim()}</span>`).join("");

    const isVideo = p.imagem.toLowerCase().split("?")[0].endsWith(".mp4");
    const media = isVideo ? `<video src="${p.imagem}" aria-label="${p.alt}" autoplay loop muted playsinline preload="metadata"></video>` : `<img src="${p.imagem}" alt="${p.alt}" loading="lazy">`;

    card.innerHTML = `
      <div class="card-image">
        ${media}
        <div class="card-overlay">
          ${p.links.projeto ? `<a href="${p.links.projeto}" target="_blank" title="Ver Projeto">${iconeStar()}</a>` : ""}
          ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" title="Ver Demo">${iconeEye()}</a>` : ""}
          ${p.links.github ? `<a href="${p.links.github}" target="_blank" title="Ver Código">${iconeGithub()}</a>` : ""}
        </div>
      </div>
      <div class="card-body">
        <h3>${p.titulo}</h3>
        <p class="card-desc">${p.descricao}</p>
        <div class="card-tech">${techTags}</div>
      </div>
    `;

    container.appendChild(card);
  });
});

function iconeStar() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
}

function iconeEye() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}

function iconeGithub() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
}
