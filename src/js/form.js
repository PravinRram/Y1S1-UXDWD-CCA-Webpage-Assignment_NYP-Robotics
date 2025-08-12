document.addEventListener("DOMContentLoaded", function () {
    // form submission
    const overlay = document.getElementById("submission-overlay")
    const loadingModal = document.getElementById("loading-modal")
    const confirmationModal = document.getElementById("confirmation-modal")

    const form = document.getElementById("join-form");

    const allMessages = {
        name: {
            success: "Looks good",
            required: "Name is required!",
        },
        email: {
            success: "Email is valid",
            required: "Email is required!",
            type: "Please enter a valid email!",
        },
        admNumber: {
            success: "Admin number is valid",
            required: "Admin number is required!",
            pattern: "Admin number must be: 25 or 24 followed by 4 numbers and a letter! (e.g. 251234A)"
        },
        phoneNumber: {
            success: "Phone number is valid",
            required: "Phone number is required!",
            pattern: "Please enter a valid Singapore phone number!",
            type: "Please enter a phone number!"
        },
        school: {
            success: "",
            required: "Please select your school!"
        },
        interest: {
            success: "",
            required: "Please select your interest(s)!"
        }
    };

    const fields = document.querySelectorAll("input, select");
     
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        fields.forEach(field => {
            if (!validateField(field)) {
                return
            }
        })

        overlay.classList.add("active");
        loadingModal.classList.add("active");
        form.reset()
        animateFakeLoading();
    })

    fields.forEach(field => {
        field.addEventListener("blur", () => {
            validateField(field)
        })
    })

    function validateField(field) {
        const name = field.id
        const inputControl = field.parentElement
        const feedbackElem = inputControl.querySelector(".feedback")
        const messages = allMessages[name];

        if (field.validity.valid) {
            setSuccess(inputControl, feedbackElem, messages.success);
            return true;
        }
        
        if (field.validity.valueMissing) {
            setError(inputControl, feedbackElem, messages.required || "This field is required");
        } 
        else if (field.validity.typeMismatch) {
            setError(inputControl, feedbackElem, messages.type || "Invalid format");
        } 
        else if (field.validity.patternMismatch) {
            setError(inputControl, feedbackElem, messages.pattern || "Doesn't match required pattern");
        } 
        else {
            setError(inputControl, feedbackElem, "Invalid input");
        }

        return false;
    }

    const setError = (inputControl, feedbackElem, message) => {
        feedbackElem.textContent = message;
        inputControl.classList.add("error");
        inputControl.classList.remove("success");
    }

    const setSuccess = (inputControl, feedbackElem, message) => {
        feedbackElem.textContent = message;
        inputControl.classList.remove("error");
        inputControl.classList.add("success");
    }

    // progress bar
    const progressBar = document.getElementById("progress-fill")
    const progressText = document.getElementById("loading-status")
    const percentText = document.getElementById("loading-percentage")

    const loadingMessages = [
    "Initializing request...",
    "Encrypting payload...",
    "Establishing secure connection...",
    "Validating input fields...",
    "Sanitizing user data...",
    "Fetching server credentials...",
    "Requesting authentication token...",
    "Synchronizing session...",
    "Uploading form data...",
    "Compressing payload...",
    "Sending to server...",
    "Awaiting server response...",
    "Verifying response integrity...",
    "Decoding server response...",
    "Rendering confirmation state...",
    "Finalizing transaction...",
    "Cleaning up temporary data...",
    "Sealing session container...",
    "Preparing confirmation display...",
    ];

    let progress = 0;
    let msgIndex = 0;

    function animateFakeLoading() {
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 5;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + "%";
            percentText.textContent = progress + "%"

            if (msgIndex < loadingMessages.length) {
                progressText.textContent = loadingMessages[msgIndex++];
            }

            if (progress >= 100) {
                clearInterval(interval)
                progressText.textContent = "Done. Redirecting..."

                setTimeout(() => {
                    loadingModal.classList.remove("active");
                    confirmationModal.classList.add("active")
                }, 1500) // wait after 100%
            }
        }, 800) // time per interval jump
    }

    const closeButton = document.querySelector(".close-button")

    closeButton.addEventListener("click", function() {
        overlay.classList.remove("active")
        confirmationModal.classList.remove("active")
    })

})