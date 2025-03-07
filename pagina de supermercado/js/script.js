document.addEventListener("DOMContentLoaded", function () {
  // Función para inicializar un carrusel independiente
  function initCarousel(carouselContainer) {
    const slides = carouselContainer.querySelectorAll(".slide");
    const prevBtn = carouselContainer.querySelector(".prev");
    const nextBtn = carouselContainer.querySelector(".next");
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    if (prevBtn && nextBtn) {
      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);
    }

    // Cambio automático cada 3 segundos
    setInterval(nextSlide, 3000);
    showSlide(currentIndex);
  }

  // Inicializamos los carruseles de Vista Exterior e Interior
  const exteriorCarousel = document.getElementById("exteriorCarousel");
  const interiorCarousel = document.getElementById("interiorCarousel");

  if (exteriorCarousel) initCarousel(exteriorCarousel);
  if (interiorCarousel) initCarousel(interiorCarousel);

  // -----------------------
  // Toggle de Audio de Fondo
  // -----------------------
  const audio = document.getElementById("bgAudio");
  const audioToggleBtn = document.querySelector("#audio-fondo button");

  if (audio && audioToggleBtn) {
    audioToggleBtn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        audioToggleBtn.textContent = "Desactivar Música";
      } else {
        audio.pause();
        audioToggleBtn.textContent = "Activar Música";
      }
    });
  }

  // -----------------------
  // Botón "Volver Arriba" (Scroll-to-Top)
  // -----------------------
  const scrollBtn = document.getElementById("btnScrollToTop");
  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > window.innerHeight / 2) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    });
  }
});
