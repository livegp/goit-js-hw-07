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
                        alt="${description}" />
                    </a>
                </li>
                `;
        })
        .join('');
}

function onGalleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        enableKeyboard: true,
        showCounter: false,
        scrollZoom: false,
        close: false,
        onShow: () => {
            document.addEventListener('keydown', onEscPress);
        }
    }); 
}

console.log(galleryItems);
