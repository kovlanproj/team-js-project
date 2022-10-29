const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    btnCloseModal: document.querySelector('[data-modal-close]'),
    backdrops: document.querySelector('.backdrop'),
    body: document.querySelector('body'),
};      
    refs.openModalBtn.addEventListener('click', onOpenModal);
    refs.btnCloseModal.addEventListener('click', onCloseModal);
    refs.backdrops.addEventListener('click', onClickBackdrop);

    function onOpenModal() {
    refs.backdrops.classList.remove('is-hidden');
    window.addEventListener('keydown', onPressESC);
    document.body.style.overflow = 'hidden';
}

function onCloseModal() {
    refs.backdrops.classList.add('is-hidden');
    window.removeEventListener('keydown', onPressESC);
    document.body.style.overflow = 'visible';
}


function onClickBackdrop(e) {
    if (e.target.classList.contains("backdrop-close-modal")) {
        onCloseModal();
    }
}

function onPressESC(e) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = e.code === ESC_KEY_CODE;

    if (isEscKey) {
        onCloseModal();
    }
}