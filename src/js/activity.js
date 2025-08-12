// For activities page

document.addEventListener("DOMContentLoaded", () => {

    // Badge
    const badgeColors = {
        "Arduino": "#af37f5ff",
        "Chill": "#8af1f8ff",
        "3D Printing": "#30e74fff",
        "Python": "#dbd942ff",
        "Conference": "#4cb2f7ff",
        "Popular": "#F97316",
        "Workshop": "#1de9bdff",
        "Event": "#8B5CF6",
        "Competition": "#f81e1eff",
        "Masterclass": "#b8d129ff",
        "Prototype": "#EC4899",
        "Team": "#4245e7ff",
        "Drone": "#524677ff",
        "IoT": "#4dacaaff",
        "Hands-on": "#3f42beff",
    };

    function updateBadgeColors() {
        document.querySelectorAll(".badge-container span").forEach(span => {
            const text = span.textContent.trim();
            const color = badgeColors[text] || "#6B7280";

            span.classList.add("badge")
            span.style.backgroundColor = color;
        })
    }

    updateBadgeColors()

    const activities = {
        1: { // Showcase
            activityType: "showcase",
            title: "Ground to Sky",
            date: "03-03-2025",
            tags: ["Drone", "Team"],
            image: "../src/assets/images/drone.jpg",
            detail: "A high-performance quadcopter built from scratch, designed to test the limits of stability and aerial maneuverability. Equipped with custom firmware, high-efficiency propellers, and a gimbal-stabilized camera, this project pushed both hardware tuning and flight control programming to the next level."
        },
        2: { // Showcase
            activityType: "showcase",
            title: "Through Steel and Sparks",
            date: "15-02-2025",
            tags: ["Competition", "Team"],
            image: "../src/assets/images/winning.jpg",
            detail: "Secured 1st place at the National Robotics Competition, leading a multidisciplinary team to design, build, and program an autonomous robot that outperformed 200+ teams nationwide in speed, precision, and task completion under competitive conditions."
        },
        3: { // Showcase
            activityType: "showcase",
            title: "Racing the Wind",
            date: "20-01-2025",
            tags: ["Drone"],
            image: "../src/assets/images/drone_close-up.jpg",
            detail: "An experimental racing drone optimized for top speed and agility, featuring a carbon fiber frame, overclocked brushless motors, and a custom lightweight battery pack. Achieved blistering speeds in indoor and outdoor test runs."
        },
        5: { // Event
            activityType: "event",
            title: "National Robotics Championship",
            date: "15-09-2025",
            time: "09:00 AM - 06:00 PM",
            location: "Singapore Expo, Hall 5",
            tags: ["Competition", "Team", "Popular"],
            image: "../src/assets/images/competition.jpg",
            detail: "A high-stakes robotics competition where teams from across the country faced off in multiple engineering challenges. From autonomous navigation to object manipulation, our team demonstrated innovation, precision, and relentless problem-solving under pressure."
        },
        6: { // Event
            activityType: "event",
            title: "Monthly Night Build",
            date: "22-08-2025",
            time: "06:00 PM - 10:00 PM",
            location: "Makerspace",
            tags: ["Workshop", "Chill", "Hands-on"],
            image: "../src/assets/images/pair.jpg",
            detail: "An informal yet intense build session where members collaborated to repair, upgrade, and assemble ongoing projects. The atmosphere was equal parts chaos and creativity, with soldering fumes, rapid prototyping, and bursts of laughter keeping the night alive."
        },
        7: { // Event
            activityType: "event",
            title: "Soldering & Circuit Masterclass",
            date: "01-09-2025",
            time: "02:00 PM - 05:00 PM",
            location: "Makerspace",
            tags: ["Workshop", "Masterclass", "Hands-on"],
            image: "../src/assets/images/circuit.jpg",
            detail: "A deep-dive workshop on precision soldering, PCB assembly, and troubleshooting common circuit issues. Participants built a functional audio amplifier while learning about component tolerances and circuit design best practices."
        },
        8: { // Event
            activityType: "event",
            title: "Tech Talk Weekend",
            date: "13-10-2025",
            time: "10:00 AM - 04:00 PM",
            location: "Block S Lecture Theatre",
            tags: ["Conference", "Popular"],
            image: "../src/assets/images/talk.jpg",
            detail: "A two-day series of talks and panels featuring industry experts discussing AI, robotics, sustainable engineering, and rapid prototyping. Attendees engaged in Q&A sessions, networking, and live tech demos."
        },
        9: { // Showcase
            activityType: "showcase",
            title: "Line-Follower Bot",
            date: "07-07-2025",
            tags: ["Arduino", "Competition"],
            image: "../src/assets/images/arduino.jpg",
            detail: "An Arduino-powered autonomous robot designed to follow complex black-line tracks with precision. Featuring PID control, IR sensor arrays, and modular code structure, it was built for speed and adaptability in competitive environments."
        },
        10: { // Showcase
            activityType: "showcase",
            title: "3D Printed Helicopter",
            date: "19-04-2025",
            tags: ["3D Printing", "Arduino", "Prototype", "Team"],
            image: "../src/assets/images/3d_print_heli.jpg",
            detail: "A fully functional scale model helicopter created entirely through additive manufacturing. The project explored aerodynamic design, gear systems, and lightweight material optimization."
        },
        11: { // Showcase
            activityType: "showcase",
            title: "Voice-Controlled Lamp",
            date: "29-05-2025",
            tags: ["IoT", "Arduino"],
            image: "../src/assets/images/breadboard_led.jpg",
            detail: "An Arduino-based smart lamp that responds to voice commands via a Bluetooth module. The project explored speech-to-text integration, power efficiency, and user-friendly design."
        },
        12: { // Showcase
            activityType: "showcase",
            title: "Programmed Drone",
            date: "02-01-2025",
            tags: ["Drone", "Python"],
            image: "../src/assets/images/drone.jpg",
            detail: "A GPS-enabled drone capable of executing pre-programmed flight paths with precision. Featuring waypoint navigation, obstacle detection, and automated take-off/landing sequences."
        },
        13: { // Showcase
            activityType: "showcase",
            title: "Rover",
            date: "28-12-2024",
            tags: ["Arduino"],
            image: "../src/assets/images/person_making_robot.jpg",
            detail: "A rugged terrain rover designed for exploration in unpredictable outdoor environments. Equipped with heavy-duty treads, ultrasonic sensors, and a real-time camera feed."
        },
        14: { // Showcase
            activityType: "showcase",
            title: "Mini Robot",
            date: "29-11-2024",
            tags: ["Prototype", "IoT"],
            image: "../src/assets/images/mini-robot.jpg",
            detail: "A palm-sized robot designed for agility and quick movements. Powered by micro-servos and a compact control board, this project was a test in shrinking robotics without compromising performance."
        }
    }

    const overlay = document.getElementById("activity-overlay")

    function openModal(id) {
        const item = activities[id];
        if (!item) return;

        if (item.activityType === "event") {
            const modal = document.querySelector(".event-modal");

            const modalImage = modal.querySelector(".modal-image");
            const modalTitle = modal.querySelector(".modal-title");
            const modalDateTime = modal.querySelector(".event-date-time");
            const modalLocation = modal.querySelector(".event-location");
            const modalDescription = modal.querySelector(".modal-p");
            const modalBadges = modal.querySelector(".badge-container");
            const modalContent = modal.querySelector(".modal-content")

            modalContent.scrollTo({
                top: 0,
            })

            modalBadges.innerHTML = "";

            modalImage.src = item.image;
            modalTitle.textContent = item.title;
            modalDescription.textContent = item.detail;

            modalDateTime.innerHTML = `<strong>${item.date + ", " + item.time}</strong>`
            modalLocation.innerHTML = `<strong>${item.location}</strong>`

            for (const badge of item.tags) {
                const span = document.createElement("span");
                span.textContent = badge
                span.classList.add("badge")
                modalBadges.appendChild(span)
            }
            updateBadgeColors()
            modal.classList.add("active");

            const closeButton = modal.querySelector(".close-button");

            closeButton.addEventListener("click", function() {
                overlay.classList.remove("active");
                modal.classList.remove("active");
            })

        } else if (item.activityType === "showcase") {
            const modal = document.querySelector(".showcase-modal");

            const modalImage = modal.querySelector(".modal-image");
            const modalTitle = modal.querySelector(".modal-title");
            const modalDate = modal.querySelector(".modal-date");
            const modalDescription = modal.querySelector(".modal-p");
            const modalBadges = modal.querySelector(".badge-container");
            const modalContent = modal.querySelector(".modal-content")

            modalContent.scrollTo({
                top: 0,
            })

            modalBadges.innerHTML = "";

            modalImage.src = item.image;
            modalTitle.textContent = item.title;
            modalDate.textContent = item.date;
            modalDescription.textContent = item.detail;

            for (const badge of item.tags) {
                const span = document.createElement("span");
                span.textContent = badge
                span.classList.add("badge")
                modalBadges.appendChild(span)
            }
            updateBadgeColors()
            modal.classList.add("active");

            const closeButton = modal.querySelector(".close-button")

            closeButton.addEventListener("click", function() {
                overlay.classList.remove("active");
                modal.classList.remove("active");
            })
        };
        // modalBadges

        overlay.classList.add("active");
    }

    const cards = document.querySelectorAll("[data-target-id]");

    cards.forEach(card => {
        card.addEventListener("click", function() {
            if (card.classList.contains("disabled")) return;
            openModal(card.getAttribute("data-target-id"))
        })
    })

    const hash = window.location.hash;
    if (hash.startsWith('#openModal=')) {
        
        const id = hash.split('=')[1];
        openModal(id);
        history.replaceState(null, '', window.location.pathname); //remove hash
    }
})