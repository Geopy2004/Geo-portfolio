// =========================
// CERTIFICATE MODAL SYSTEM
// =========================

const modal = document.getElementById("certModal");
const frame = document.getElementById("certFrame");
const img = document.getElementById("certImage");
const closeBtn = document.querySelector(".modal .close");

// open modal safely
document.querySelectorAll(".view-cert").forEach(button => {
    button.addEventListener("click", () => {
        const src = button.dataset.src;

        if (!src || !modal) return;

        // reset viewers
        if (frame) {
            frame.src = "";
            frame.style.display = "none";
        }
        if (img) {
            img.src = "";
            img.style.display = "none";
        }

        // detect file type
        const isPDF = src.toLowerCase().endsWith(".pdf");

        if (isPDF && frame) {
            frame.src = src;
            frame.style.display = "block";
        } else if (img) {
            img.src = src;
            img.style.display = "block";
        }

        modal.style.display = "flex";
    });
});


// close modal function (clean reusable)
function closeModal() {
    if (!modal) return;

    modal.style.display = "none";

    if (frame) frame.src = "";
    if (img) img.src = "";
}

// close button
if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
}

// click outside modal
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


// =========================
// SMOOTH SCROLL NAVIGATION
// =========================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // only handle internal links
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60; // adjust for navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});


//CONTACT
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function(e){
    e.preventDefault();

    status.textContent = "Sending message...";
    status.style.color = "#9da7b3";

    const data = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if(response.ok){
            status.textContent = "✅ Message sent successfully!";
            status.style.color = "#2ea043";
            form.reset();
        } else {
            status.textContent = "❌ Failed to send. Try again.";
            status.style.color = "#f85149";
        }
    })
    .catch(() => {
        status.textContent = "⚠️ Network error. Please try later.";
        status.style.color = "#f85149";
    });
});