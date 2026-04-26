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