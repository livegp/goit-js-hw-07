import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', galleryMarkup);
gallery.addEventListener('click', onGalleryClick);

function createGalleryMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
                <li class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img 
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"/>
                    </a>
                </li>`;
        })
        .join('');
}

function onGalleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
    instance.show();
    gallery.addEventListener('keydown', onEscPress);
    function onEscPress(event) {
        if (event.code === 'Escape') {
            instance.close();
            gallery.removeEventListener('keydown', onEscPress);
        }
    }
}

console.log(galleryItems);
