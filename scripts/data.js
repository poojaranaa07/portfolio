const projects = [
  {
    icon: "fas fa-magic",
    category: "AI Services Platform",
    title: "CodeDeepAI",
    subheading:" Innovating with AI",
    description: "Designed and developed a modern, conversion-focused UI for an AI services platform, improving user experience through intuitive navigation and seamless section flow while building scalable, reusable UI components.",
    logo: "assets/imgs/codedeepai-logo.svg",
    image: "assets/project-previews/codedeep-ui.png",
    link: "https://codedeepai.com/",
    skills: [
      { img: "assets/imgs/reactjs.png", title: "React JS" },
      { img: "assets/imgs/css.webp", title: "CSS & SCSS" },
    ]
  },
   {
    icon: "fas fa-dolly-flatbed",
    category: "Relocation Services Platform",
    title: "MoverJunction",
    subheading: " Moving companies, moving services, free quotes",
    description: "Designed and developed a user-centric interface for a moving services marketplace, enabling users to easily compare multiple moving companies, get instant quotes, and plan relocations through a streamlined and intuitive experience.",
    logo: "assets/imgs/moverjunction-logo.svg",
    image: "assets/project-previews/moverjunction-ui.png",
    link: "https://www.moverjunction.com/",
    skills: [
      { img: "assets/imgs/html-img.webp", title: "HTML" },
      { img: "assets/imgs/css.webp", title: "CSS & SCSS" },
      { img: "assets/imgs/js.webp", title: "JavaScript" },
      { img: "assets/imgs/php-img.png", title: "PHP" }
    ]
  },
  {
    icon: "fas fa-dollar-sign",
    category: "Nonprofit Donation Platform",
    title: "ONE SIMPLE WISH",
    subheading: " Spreads love, hope, and joy ",
    description: "Designed a conversion-focused and emotionally driven UI for a nonprofit platform that simplifies the donation process by allowing users to explore real stories, select wishes, and contribute through a seamless and intuitive experience.",
    logo: "assets/imgs/osw-logo.png",
    image: "assets/project-previews/onesimplewish-ui.png",
    link: "https://www.onesimplewish.org/",
    skills: [
      { img: "assets/imgs/html-img.webp", title: "HTML" },
      { img: "assets/imgs/css.webp", title: "CSS & SCSS" },
      { img: "assets/imgs/js.webp", title: "JavaScript" },
      { img: "assets/imgs/php-img.png", title: "PHP" }]
  },
  {
    icon: "fas fa-bullhorn",
    category: "AI Marketing & Technology Platform",
    title: "Cretorial",
    subheading: "  Blending Content, Marketing & Technology for Modern Brands.",
    description: "Developed a conversion-focused UI for an AI-powered marketing and technology platform, transforming complex service offerings into a structured, user-friendly experience with clear navigation, interactive content sections, and scalable design systems",
    logo: "assets/imgs/cretorial-logo.png",
    image: "assets/project-previews/cretorial-ui.png",
    link: "https://www.cretorial.com/",
    skills: [
      { img: "assets/imgs/html-img.webp", title: "HTML" },
      { img: "assets/imgs/css.webp", title: "CSS & SCSS" },
      { img: "assets/imgs/js.webp", title: "JavaScript" },
      { img: "assets/imgs/php-img.png", title: "PHP" }]
  },
  {
    icon: "fas fa-building",
    category: "Real Estate Marketplace",
    title: "Coldwell Banker La Costa Realty",
    subheading: " Puerto Vallarta Homes for Sale",
    description: "Developed a conversion-focused UI for a real estate platform, organizing complex property listings, location-based search, and service offerings into a clear, visually engaging experience that enhances property discovery and user decision-making.",
    logo: "assets/imgs/cblacosta-logo.png",
    image: "assets/project-previews/cblacosta-ui.png",
    link: "https://www.cblacosta.com/",
    skills: [
      { img: "assets/imgs/wordpress.png", title: "WordPress" },
      { img: "assets/imgs/css.webp", title: "CSS & SCSS" },
      { img: "assets/imgs/php-img.png", title: "PHP" }]
  },

  
];

const container = document.querySelector(".projects-container");

projects.forEach(project => {
  const article = document.createElement("article");
  article.className = "project-card project-tech animate-item";

  article.innerHTML = `
    <div class="project-preview" aria-hidden="true">
      <div class="project-preview-media">
        <img
          class="project-preview-image"
          src="${project.image}"
          alt="${project.title}"
          loading="lazy"
        />
      </div>
    </div>

    <div class="project-content">
    <div class="project-icon">
        <i class="${project.icon}"></i> <span>${project.category}</span>
      </div>
        <h3>${project.title}</h3>
      <p>${project.description}</p>

      <div class="allSkills projectSkills">
        ${project.skills.map(skill => `
          <div class="skillCard">
            <img src="${skill.img}" title="${skill.title}" alt="${skill.title}" />
          </div>
        `).join("")}
      </div>

      <a class="text-link" href="${project.link}" target="_blank" rel="noreferrer">
        Visit website <img src="assets/imgs/arrow-icon.svg" alt="External link" />
      </a>
    </div>
  `;

  container.appendChild(article);
});
