import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onOpenModal);

function createGalleryMarkup(galleryItems) {
  const markup = galleryItems
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `;
    })
    .join("");
  return markup;
}

function onOpenModal(e) {
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  e.preventDefault();
  const lightBoxInstance = basicLightbox.create(
    `<img width="1280" src="${e.target.dataset.source}">`,

    {
      onShow: () => {
        window.addEventListener("keyup", onEscKeyPress);
      },
      onClose: () => {
        window.removeEventListener("keyup", onEscKeyPress);
      },
    }
  );
  lightBoxInstance.show();

  function onEscKeyPress(e) {
    if (e.code === "Escape") {
      lightBoxInstance.close();
    }
  }
}
