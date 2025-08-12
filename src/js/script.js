

document.addEventListener("DOMContentLoaded", function () {
    // typewriter effect
    function typeText(element, speed = 20) {
        const originalText = element.getAttribute("data-text")
        element.textContent = "";
        element.innerHTML = ""; // clear the spams

        const words = originalText.split(" ").map(word => {
            const span = document.createElement("span");
            span.classList.add("word");
            span.style.display = "inline-block";
            span.style.whiteSpace = "pre";
            span.textContent = "";
            element.appendChild(span);
            element.append(" ");
            return {span, word};
        })

        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        cursor.style.backgroundColor = getComputedStyle(element).color

        words[0].span.appendChild(cursor);

        let wordIndex = 0;
        let charIndex = 0;

        const blinkSpeed = 250; // cursor blink speed
        cursor.style.animationDuration = blinkSpeed + "ms";
        cursor.style.transitionDuration = blinkSpeed + "ms";

        setTimeout(() => {
            element.classList.add("active-anim");
            typeLetter();
        }, blinkSpeed * 2)

        function typeLetter() {
            if (wordIndex >= words.length) {
                element.classList.remove("active-anim");
                
                setTimeout(() => {
                    cursor.classList.add("fade-out");
                    setTimeout(() => cursor.remove(), blinkSpeed);
                }, blinkSpeed * 2); // cursor stays blinking for a while before fading
                return;
            }

            const {span, word} = words[wordIndex];
            
            span.textContent += word.charAt(charIndex);
            span.appendChild(cursor);

            charIndex++;

            if (charIndex >= word.length) {
                wordIndex++;
                charIndex = 0;
            }

            setTimeout(typeLetter, speed); // time between each letter
        }
    }
    // glitch effect
    function glitchify(element) { //tm
        const text = element.textContent;
        element.textContent = "";
        element.style.opacity = 1;

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span");
            span.textContent = text.charAt(i);
            span.classList.add("glitch-letter");

            const delay = (Math.random() * 0.7).toFixed(2);
            const iterationCount = Math.floor(Math.random() * 4) + 1;

            span.style.animationDelay = `${delay}s`;
            span.style.animationIterationCount = iterationCount;

            element.appendChild(span);
        }
    }

    // observer to observe out of view elements. For replaying animations
    function createObserver(callback, thr) {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                if (entry.isIntersecting) {
                    el.style.opacity = 1; // make sure the element is visible
                    callback(el)
                } else {
                    el.classList.remove("active-anim")
                    el.style.opacity = 0; // hide the element when out of view
                }
            })
        }, {threshold: thr});
        return observer
    }

    const typewriterObserver = createObserver(typeText, 0)
    const glitchObserver = createObserver(glitchify, 0.5) // will add threshold logic to glitch so they dont start early

    document.querySelectorAll(".typewriter").forEach(el => {
        typewriterObserver.observe(el);
    })
    document.querySelectorAll(".glitch").forEach(el => {
        glitchObserver.observe(el);
    })

    // fade-in effect for page transitions

    const navbarContent = document.getElementById('navbarContent');
    
    if (sessionStorage.getItem("navigated") === "true") {
        // Keep nav bar open for new page
        navbarContent.style.transition = "none"; // disable transition for immediate effect
        navbarContent.classList.add("show");

        const overlay = document.createElement("div");
        overlay.classList.add("page-transition-overlay");
        overlay.classList.add("fade-out");
        document.body.appendChild(overlay);

        setTimeout(() => {
            navbarContent.style.transition = ""; // re-enable transition
            navbarContent.classList.remove("show"); // remoe mobile navbar 
        }, 100);


        setTimeout(() => {
            overlay.classList.remove("fade-out"); // reset after transition
            sessionStorage.removeItem("navigated"); // reset so refresh doesn't trigger it
            overlay.remove();   
        }, 500)

    }

    // Custom link opener with transition
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");

            // Skip if:
            // 1. Opens in new tab
            // 2. Goes to activities.html
            // 3. Is just an in-page anchor
            if (
                link.target === "_blank" ||
                link.href.includes('/activities.html') ||
                (href && href.startsWith("#"))
            ) {
                return; // allow default scroll or new tab
            }

            e.preventDefault();

            const overlay = document.createElement("div");
            overlay.classList.add("page-transition-overlay", "fade-in");
            document.body.appendChild(overlay);

            setTimeout(() => {
                window.location.href = href;
                if (href && !href.startsWith("http")) {
                    sessionStorage.setItem("navigated", "true");
                }
            }, 200);
        });
    });


    // Smooth accordion collapse / expand
    document.querySelectorAll('.accordion input[type="checkbox"]').forEach(checkbox => {
        const content = checkbox.parentElement.querySelector(".accordion-content")

        content.style.height = "0px";

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                // expand
                content.style.height = content.scrollHeight + "px";

                // // after transition, reset to auto so it can resize if content changes
                // content.addEventListener('transitionend', function handler() {
                //     content.style.height = "auto";
                //     content.removeEventListener('transitionend', handler);
                // });
            } else {
                // collapse (need to fix height first so transition works)
                content.style.height = content.scrollHeight + "px";
                requestAnimationFrame(() => {
                    content.style.height = "0px";
                });
            }
        })
    })
    
    // Video load (brute force)
    const video = document.querySelector('.bg-video');

    video.addEventListener('canplay', () => {
        setTimeout(() => {
            video.classList.add('ready');
            video.play();
        }, 200)
    });
    video.load(); // force load

    // Parallax

    function handleParallax() {
        document.querySelectorAll(".parallax").forEach(el => {
            let parent = el.parentElement;
            parent.style.overflow = "hidden" // stop overflow

            let rect = el.getBoundingClientRect();
            let scrollTop = window.scrollY || window.pageYOffset;
            let offsetTop = rect.top + scrollTop;
            let windowHeight = window.innerHeight;
            let elementHeight = el.scrollHeight;

            let progress = (scrollTop + windowHeight - offsetTop) / (rect.height + windowHeight);
            progress = Math.max(0, Math.min(1, progress)); // clamp

            let translateY = (progress - 0.5) * (elementHeight / 1.2);
            el.style.transform = `translateY(${translateY}px)`
        })
    }

    window.addEventListener("scroll", handleParallax);
    window.addEventListener("resize", handleParallax);
    handleParallax();

    // Start of portrait-fetch for photos of com members

    const photoElements = document.getElementsByClassName('portrait-fetch');
    const numberOfMemberPhotos = photoElements.length;
    const apiLink = 'https://randomuser.me/api/?inc=picture' + '&results=' + numberOfMemberPhotos

    fetch(apiLink)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < numberOfMemberPhotos; i++) {
                var targetPhoto = data.results[i].picture.large;
                photoElements[i].src = targetPhoto;
            }
        })
        .catch(error => console.error('Error fetching pictures for com members', error));

    // end of portrait-fetch

    // start of collapsible button (committee sections)
    
    const buttons = document.querySelectorAll('.collapsible');

    buttons.forEach(button => {
        const targetSelector = button.getAttribute('data-target');
        const section = document.querySelector(targetSelector);

    button.addEventListener('click', () => {
        const isOpen = section.style.maxHeight && section.style.maxHeight !== '0px';

        if (isOpen) {
            section.style.maxHeight = '0';
            button.classList.add('collapsed');
            button.childNodes[0].nodeValue = 'Expand';
        } else {
            section.style.maxHeight = section.scrollHeight + 'px';
            button.classList.remove('collapsed');
            button.childNodes[0].nodeValue = 'Collapse';
        }
    });
    });
    // end of collapsible button
})