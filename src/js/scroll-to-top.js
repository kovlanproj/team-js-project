const btnScrollToTop = document.querySelector('.back_to_top');

window.addEventListener('scroll', () => {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;
    if (scrolled > coords / 2) {
        btnScrollToTop.classList.add('back_to_top-show');
    };
    if (scrolled < coords / 2) {
        btnScrollToTop.classList.remove('back_to_top-show');
    };
});

btnScrollToTop.addEventListener('click', () => {
    if (window.pageYOffset > 0) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
});