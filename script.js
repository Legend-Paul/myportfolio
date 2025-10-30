import { skillsData } from "./data/skillData.js";
import { projects } from "./data/projectsData.js";
let skillContainer = document.querySelector(".skills-cont");
let navBtn = document.querySelectorAll(".nav-btn");
let body = document.querySelector(".body");
let sections = document.querySelectorAll(".section");
let nav = document.querySelector(".nav-bar");
let footer = document.querySelector("footer");
let projectCont = document.querySelector(".projects");
let activeIconCont = document.querySelector(".active-icon");
let inactiveIconConts = document.querySelector(".inactive-icons");

let prevScroll = 0;
navBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        let currentBtn = document.querySelector(".active");
        if (currentBtn) {
            currentBtn.classList.remove("active");
        }

        this.classList.add("active");
    });
});

window.onscroll = () => {
    sections.forEach((section) => {
        let scrollingHeight = window.scrollY;
        let sectionTop = section.offsetTop;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");
        positionFooter(scrollingHeight);
        if (
            scrollingHeight >= sectionTop &&
            scrollingHeight < sectionTop + height
        ) {
            navBtn.forEach((Btn) => {
                Btn.classList.remove("active");
                document
                    .querySelector(`nav a div[data-id="${id}"]`)
                    .classList.add("active");
            });
        }
    });
};

function positionFooter(scrollingHeight) {
    if (prevScroll !== scrollingHeight) {
        if (prevScroll <= scrollingHeight) {
            footer.classList.add("hide");
            footer.classList.remove("visible");

        } else {
            footer.classList.add("visible");
            footer.classList.remove("hide");
        }
        prevScroll = scrollingHeight;
    }
}

function createSkillCard(img, name, content) {
    // Create a skill card with the provided image, name, and content
    return `
        <div class="skill html">
            <div class="title">
                <img src="images/${img}" alt="img Image" />
                <h4>${name}</h4>
            </div>
            <div class="content">
                <p>
                    ${content}
                </p>
            </div>
        </div>
    `;
}

function displaySkills() {
    // Generate skill cards and append them to the skill container
    let data = [...skillsData];
    for (let i = 0; i < data.length * 2; i++) {
        let skill = data[i % data.length];
        let skillCard = createSkillCard(skill.img, skill.name, skill.content);
        skillContainer.innerHTML += skillCard;
    }
}
displaySkills();

function hideInactiveIcons() {
    inactiveIconConts.classList.remove("inactive-display");
}
function displayIactiveIcons() {
    document.addEventListener("click", (e) => {
        let activeIcon = e.target.closest(".active-icon");
        if (activeIcon) {
            activeIconCont.classList.toggle("active-display");
            inactiveIconConts.classList.add("inactive-display");
        } else {
            hideInactiveIcons();
        }
    });
}
displayIactiveIcons();

function toggleActiveIcon() {
    inactiveIconConts.addEventListener("click", (e) => {
        let iconCont = e.target.closest(".icon-cont");

        if (iconCont) {
            let icon = iconCont.querySelector("i");
            let activeIcon = inactiveIconConts.querySelector(".active");
            // console.log(icon, "clicked");
            console.log(activeIcon, "active icon");

            if (icon) {
                activeIconCont.innerHTML = changeModeIcon(icon);

                activeIcon.classList.remove("active");
                activeIcon.classList.add("inactive");
                iconCont.classList.remove("inactive");
                iconCont.classList.add("active");
                let mode = icon.nextElementSibling;
                displayMode(mode.innerText, icon);
            }
        }
    });
}
function displayMode(mode, icon) {
    if (mode === "Dark") {
        document.body.classList.remove("light-mode");
    } else {
        document.body.classList.add("light-mode");
    }
}
function changeModeIcon(icon) {
    return `${icon.outerHTML} <i class="bi bi-chevron-down"></i>`;
}
toggleActiveIcon();

//projects 
const projectsContainer = document.querySelector(".projects");

function renderProjects() {
  projectsContainer.innerHTML = projects.map(project => `
    <div class="project">
      <div class="img-cont">
        <a href="${project.liveLink}" target="_blank">
          <img src="${project.image}" alt="${project.title} project image" />
        </a>
      </div>
      <div class="project-description">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="technologies">
          ${project.technologies.map(tech => `<p>${tech}</p>`).join("")}
        </div>
        <div class="links">
          <div class="code">
            <a target="_blank" href="${project.codeLink}">
              <i class="bi bi-github"></i>
              <p>Code</p>
            </a>
          </div>
          <div class="live">
            <a target="_blank" href="${project.liveLink}">
              <i class="bi bi-globe"></i>
              <p>Live</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

renderProjects();
