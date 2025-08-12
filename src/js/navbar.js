document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector('.custom-navbar')
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarContent = document.getElementById('navbarContent');
    const blurOverlay = document.querySelector(".nav-blur-overlay")

    toggleButton.addEventListener("click", () => {
        navbarContent.classList.toggle('show')
        toggleButton.classList.toggle('opened')
        blurOverlay.classList.toggle('active')
    })

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 992) { // Bootstrap's lg breakpoint
            blurOverlay.classList.remove("active");
            navbarContent.classList.remove("show");
            toggleButton.classList.remove('opened');
        }
    })

    window.addEventListener("scroll", () => {
        if (window.scrollY > 64) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    })
})