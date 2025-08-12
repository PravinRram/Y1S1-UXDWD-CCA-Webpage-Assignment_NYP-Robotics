document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll('button[data-tab]');
    const tabItems = document.querySelectorAll('.tabs-group .tab');
    const tabSections = document.querySelectorAll('.tab-content');

    let resizeTimeout;

    window.addEventListener("resize", () => {
        tabButtons.forEach((button) => {button.style.transition = "none";})
        tabItems.forEach((item) => {item.style.transition = "none";})

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            tabButtons.forEach((button) => {button.style.transition = "";})
            tabItems.forEach((item) => {item.style.transition = "";})
        }, 100)
    })

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selected = button.getAttribute('data-tab');
            
            tabItems.forEach(item => {
                const tabBtn = item.querySelector("button[data-tab]")
                if (tabBtn && tabBtn.getAttribute("data-tab") === selected) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            const scrollTarget = document.querySelector(".tabs-group")

            tabSections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('data-tab') === selected) {
                    section.classList.add('active');
                    scrollTarget.scrollIntoView({ behavior: "smooth", block: "start"})
                }
            })
        })
    })

    const filterButtons = document.querySelectorAll("button[data-filter]")
    const filterSections = document.querySelectorAll(".filter-content")

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selected = button.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove("selected"))
            button.classList.add("selected")

            const scrollTarget = document.querySelector(".tabs-group")

            filterSections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('data-filter') === selected) {
                    section.classList.add('active');
                    scrollTarget.scrollIntoView({ behavior: "smooth", block: "start"})
                }
            })
        })
    })
})