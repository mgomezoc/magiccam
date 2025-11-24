// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle del menú móvil con accesibilidad mejorada
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer clic en un enlace (móvil)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Ignorar enlaces vacíos o solo "#"
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Actualizar focus para accesibilidad
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  });
});

// Lazy loading para iframe
const demoIframe = document.querySelector('.demo-iframe');

if (demoIframe && 'IntersectionObserver' in window) {
  const iframeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
          }
          iframeObserver.unobserve(iframe);
        }
      });
    },
    {
      rootMargin: '100px',
    }
  );

  // Si el iframe tiene src, no hacer lazy load
  if (!demoIframe.src || demoIframe.src === window.location.href) {
    demoIframe.dataset.src = 'https://cesargomez.8thwall.app/xv-renata/';
    demoIframe.removeAttribute('src');
  }

  iframeObserver.observe(demoIframe);
}

// Animación de entrada para elementos
if ('IntersectionObserver' in window) {
  const animateOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Aplicar animación a tarjetas
  const cards = document.querySelectorAll(
    '.step-card, .usecase-card, .benefit-item, .demo-feature-card'
  );

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    animateOnScroll.observe(card);
  });
}

// Validación mejorada del formulario
const contactForm = document.querySelector('.contact-card form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Validación personalizada
    const inputs = contactForm.querySelectorAll(
      'input[required], select[required]'
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
      }
    });

    if (!isValid) {
      e.preventDefault();
      const firstError = contactForm.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Remover error al escribir
  contactForm.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
    });
  });
}

// Performance: Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty('--transition-fast', '0.1s');
  document.documentElement.style.setProperty('--transition-smooth', '0.15s');
}

// Console message para desarrolladores
console.log(
  '%c¡Hola! 👋',
  'font-size: 20px; font-weight: bold; color: #c85bff;'
);
console.log('%cMagicCam by 13Bodas', 'font-size: 14px; color: #00e5ff;');
console.log(
  '%c¿Interesado en trabajar con nosotros? Visita 13bodas.com',
  'font-size: 12px; color: #f4d0ff;'
);
