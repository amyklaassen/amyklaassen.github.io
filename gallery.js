const items = document.querySelectorAll(".kunst-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

const titleEl = document.querySelector(".lightbox-title");
const descEl = document.querySelector(".lightbox-desc");
const thumbsContainer = document.querySelector(".lightbox-thumbs");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentImages = [];
let currentIndex = 0;

// =====================
// UPDATE VIEW
// =====================
function updateView() {
  const imgData = currentImages[currentIndex];

  lightboxImg.src = imgData.src;
  titleEl.textContent = imgData.title || "";
  descEl.textContent = imgData.desc || "";

  // thumbnails highlighten
  document.querySelectorAll(".lightbox-thumbs img").forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });
}

// =====================
// OPEN
// =====================
items.forEach(item => {
  item.addEventListener("click", () => {
    currentImages = JSON.parse(item.dataset.images);
    currentIndex = 0;

    // thumbnails genereren
    thumbsContainer.innerHTML = "";

    currentImages.forEach((img, index) => {
      const thumb = document.createElement("img");
      thumb.src = img.src;

      thumb.addEventListener("click", () => {
        currentIndex = index;
        updateView();
      });

      thumbsContainer.appendChild(thumb);
    });

    updateView();
    lightbox.classList.add("active");
  });
});

// =====================
// NAVIGATIE
// =====================
function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateView();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateView();
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// =====================
// CLOSE
// =====================
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// =====================
// KEYBOARD
// =====================
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") lightbox.classList.remove("active");
});