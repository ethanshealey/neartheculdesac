(function () {
    const grid = document.querySelector('.band-grid');
    const cards = Array.from(document.querySelectorAll('.member'));
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    let currentIndex = 0;

    function updateArrows() {
        const atStart = currentIndex === 0;
        const atEnd = currentIndex === cards.length - 1;
        prevBtn.style.opacity = atStart ? '0.25' : '1';
        nextBtn.style.opacity = atEnd ? '0.25' : '1';
        prevBtn.style.pointerEvents = atStart ? 'none' : 'auto';
        nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
    }

    function goTo(index) {
        if (index < 0 || index >= cards.length) return;
        currentIndex = index;
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        updateArrows();
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Keep currentIndex in sync as the user scrolls or swipes
    grid.addEventListener('scroll', () => {
        const cardWidth = cards[0].offsetWidth + 12;
        const index = Math.round(grid.scrollLeft / cardWidth);
        currentIndex = Math.max(0, Math.min(index, cards.length - 1));
        updateArrows();
    });

    updateArrows();

})();