import { skillsData } from "./data/skillData.js";
let skillContainer = document.querySelector(".skills-cont");
let navBtn = document.querySelectorAll(".nav-btn");
let body = document.querySelector(".body");
let sections = document.querySelectorAll(".section");
let nav = document.querySelector(".nav-bar");
let footer = document.querySelector("footer");
let projectCont = document.querySelector(".projects");

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
            footer.style.position = "relative";
        } else {
            footer.style.position = "fixed";
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
