// ===== CERTIFICATE MODAL =====
const modal = document.getElementById("certModal");
const certImage = document.getElementById("certImage");
const certFrame = document.getElementById("certFrame");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".view-cert").forEach(btn => {
    btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-src");

        modal.style.display = "flex";

        // RESET FIRST (important for clean switching)
        certImage.src = "";
        certFrame.src = "";

        if (src.endsWith(".pdf")) {
            certFrame.style.display = "block";
            certImage.style.display = "none";
            certFrame.src = src;
        } else {
            certImage.style.display = "block";
            certFrame.style.display = "none";

            // LOAD IMAGE NATURAL SIZE
            certImage.onload = () => {
                certImage.style.width = "auto";
                certImage.style.height = "auto";
            };

            certImage.src = src;
        }
    });
});

// CLOSE MODAL
function closeModal() {
    modal.style.display = "none";
    certFrame.src = "";
    certImage.src = "";
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});