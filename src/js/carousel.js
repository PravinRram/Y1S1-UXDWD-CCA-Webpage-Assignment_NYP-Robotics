document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".carousel-card");
    const track = document.querySelector(".carousel-track")

    let currentIndex = Math.floor(cards.length / 2);
    let resizeTimeout;

    window.addEventListener("resize", () => {
        track.style.transition = "none";
        cards.forEach((card) => {card.style.transition = "none";})

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            track.style.transition = "";
            cards.forEach((card) => {card.style.transition = "";})
        }, 100)
    })

    function updateCarousel() {
        const card = document.querySelector(".carousel-card:not(.active):not(.left):not(.right)");
        const cardWidth = card.getBoundingClientRect().width;
        const offset = -currentIndex * (cardWidth);
        track.style.transform = `translateX(${offset}px)`;

        cards.forEach((card, index) => {
            const image = card.querySelector("img")
            const imgOffset = index - currentIndex;
            const parallax = imgOffset * cardWidth * 0.1;

            image.style.transform = `translateX(${parallax}px)`;
            
            card.classList.remove("active")
            if (index === currentIndex) {
                card.classList.add("active");
                card.classList.remove("disabled")
            } else {
                card.classList.add("disabled")
            }
            // } else if (index === (currentIndex - 1)) {
            //     card.classList.add("left");
            // } else if (index === (currentIndex + 1)) {
            //     card.classList.add("right");
            // }
            // left & right not needed
        });

        checkBoundary()
    }

    // No looping carousel
    function checkBoundary() {
        rightButton.classList.add("active")
        leftButton.classList.add("active")

        if (currentIndex === cards.length - 1) {
            rightButton.classList.remove("active")
        } else if (currentIndex === 0) {
            leftButton.classList.remove("active")
        }
    }

    const rightButton = document.querySelector(".carousel-btn.right");
    const leftButton = document.querySelector(".carousel-btn.left");

    window.addEventListener("resize", () => {
        updateCarousel()
    })

    let idleTimer = null;
    let autoplayInterval = null;

    const idleDelay = 10000;
    const autoplaySpeed = 4000;

    function startAutoplay() {
        if (autoplayInterval) return;
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            // Does not autoplay on hover
            if (document.querySelector(".carousel-card.active").matches(":hover")) {
                clearInterval(autoplayInterval);
                return
            }
            rightButton.click();
            startAutoplay()
        }, autoplaySpeed);
    }

    function resetIdleTimer() {
        stopAutoplay();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            startAutoplay();
        }, idleDelay);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }

    rightButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
        resetIdleTimer();
    });

    leftButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
        resetIdleTimer();
    });

    updateCarousel();
    startAutoplay();
})