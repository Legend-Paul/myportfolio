let navBtn = document.querySelectorAll(".nav-btn");
let body = document.querySelector(".body");
let sections = document.querySelectorAll(".section");
let nav = document.querySelector(".nav-bar");

navBtn.forEach(btn=>{
    
    btn.addEventListener("click", function(){
        let currentBtn = document.querySelector(".active");
        if (currentBtn) {
            currentBtn.classList.remove("active");
        }
        console.log(this);
        this.classList.add("active");
        console.log(btn);
    });
});

window.onscroll = ()=>{
    sections.forEach(section=>{
        let scrollingHeight = window.scrollY;
        let sectionTop = section.offsetTop;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (scrollingHeight >= sectionTop && scrollingHeight < sectionTop + height){
            navBtn.forEach(Btn=>{
                Btn.classList.remove("active");
                document.querySelector(`nav a div[data-id="${id}"]`).classList.add("active");
            });
        }
    });
}
