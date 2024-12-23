let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
    // Ocultar todos los slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });

    // Mostrar el slide correspondiente
    slides[index].classList.add('active');
}

function moveSlide(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    showSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index - 1; // Para ajustar al índice basado en 0
    showSlide(currentIndex);
}

// Iniciar el carrusel mostrando el primer slide
showSlide(currentIndex);
