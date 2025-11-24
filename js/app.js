// ==========================================
// INICIALIZACIÓN
// ==========================================

// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Registrar GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// NAVEGACIÓN
// ==========================================

// Toggle del menú móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer clic en un enlace
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

      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  });
});

// ==========================================
// GSAP ANIMATIONS CON SCROLLTRIGGER
// ==========================================

// Configuración global de GSAP
gsap.config({
  force3D: true,
});

// Función helper para animaciones
const createScrollTrigger = (element, animation) => {
  return {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      // markers: true, // Descomentar para debugging
    },
    ...animation,
  };
};

// ==========================================
// 1. HERO ANIMATIONS
// ==========================================

// Fade up con retraso escalonado
gsap.utils.toArray('.gsap-fade-up').forEach((element, index) => {
  gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: index * 0.15,
    ease: 'power3.out',
  });
});

// Animaciones con delay específico
gsap.from('.gsap-fade-up-delay-1', {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: 'power3.out',
});

gsap.from('.gsap-fade-up-delay-2', {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  ease: 'power3.out',
});

gsap.from('.gsap-fade-up-delay-3', {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: 'power3.out',
});

gsap.from('.gsap-fade-up-delay-4', {
  y: 20,
  opacity: 0,
  duration: 1,
  delay: 0.8,
  ease: 'power3.out',
});

// Fade in simple
gsap.from('.gsap-fade-in', {
  opacity: 0,
  duration: 1,
  ease: 'power2.out',
});

// Scale in para elementos visuales
gsap.from('.gsap-scale-in', {
  scale: 0.8,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
  ease: 'back.out(1.3)',
});

// ==========================================
// 2. CARDS CON STAGGER (STEPS, USECASES, DEMO FEATURES)
// ==========================================

// Animación para todas las cards con stagger
gsap.utils.toArray('.gsap-card').forEach((card) => {
  gsap.from(
    card,
    createScrollTrigger(card, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
    })
  );
});

// Animación específica para step cards con rotación sutil
gsap.utils.toArray('.step-card').forEach((card, index) => {
  gsap.from(
    card,
    createScrollTrigger(card, {
      y: 100,
      opacity: 0,
      rotation: index % 2 === 0 ? -5 : 5,
      duration: 1,
      delay: index * 0.15,
      ease: 'back.out(1.2)',
    })
  );
});

// Animación para usecase cards con efecto de revelación
gsap.utils.toArray('.usecase-card').forEach((card, index) => {
  gsap.from(
    card,
    createScrollTrigger(card, {
      x: index % 2 === 0 ? -80 : 80,
      opacity: 0,
      duration: 1,
      delay: index * 0.1,
      ease: 'power3.out',
    })
  );
});

// ==========================================
// 3. BENEFITS SECTION
// ==========================================

// Slide desde la derecha para benefit items
gsap.utils.toArray('.gsap-slide-right').forEach((item, index) => {
  gsap.from(
    item,
    createScrollTrigger(item, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power2.out',
    })
  );
});

// Panel lateral con scale
gsap.utils.toArray('.benefits-panel').forEach((panel) => {
  gsap.from(
    panel,
    createScrollTrigger(panel, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.2)',
    })
  );
});

// ==========================================
// 4. DEMO SECTION
// ==========================================

// Animación del teléfono con efecto 3D
gsap.utils.toArray('.gsap-phone').forEach((phone) => {
  gsap.from(
    phone,
    createScrollTrigger(phone, {
      y: 100,
      rotationY: 15,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
  );
});

// Feature cards del demo con stagger
gsap.utils.toArray('.demo-feature-card').forEach((card, index) => {
  gsap.from(
    card,
    createScrollTrigger(card, {
      x: 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power3.out',
    })
  );
});

// ==========================================
// 5. TIMELINE DEL PROCESO
// ==========================================

// Animación secuencial para los pasos del proceso
gsap.utils.toArray('.gsap-timeline-item').forEach((item, index) => {
  const badge = item.querySelector('.process-badge');
  const content = item.querySelector('div:last-child');

  // Timeline para coordinar múltiples animaciones
  const tl = gsap.timeline(createScrollTrigger(item, {}));

  tl.from(badge, {
    scale: 0,
    rotation: -180,
    duration: 0.6,
    ease: 'back.out(2)',
  })
    .from(
      content,
      {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    )
    .from(
      item,
      {
        borderLeftColor: 'rgba(255, 255, 255, 0)',
        duration: 0.4,
      },
      '-=0.4'
    );
});

// ==========================================
// 6. CONTACT SECTION
// ==========================================

// Slide desde la derecha para texto de contacto
gsap.utils.toArray('.contact-text').forEach((text) => {
  gsap.from(
    text,
    createScrollTrigger(text, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  );
});

// Scale in para el formulario
gsap.utils.toArray('.contact-card').forEach((card) => {
  gsap.from(
    card,
    createScrollTrigger(card, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.2)',
    })
  );
});

// ==========================================
// 7. ANIMACIONES DE PARALLAX (OPCIONAL)
// ==========================================

// Parallax para glows del hero
gsap.to('.hero-glow-orb', {
  y: -30,
  x: 20,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
});

gsap.to('.hero-glow-orb-2', {
  y: 30,
  x: -20,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
});

// Parallax para el teléfono del demo
gsap.to('.demo-phone', {
  y: -40,
  scrollTrigger: {
    trigger: '.demo-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
});

// ==========================================
// 8. REVEAL DE TEXTO CON SPLIT (OPCIONAL AVANZADO)
// ==========================================

// Esta sección es opcional - descomenta si quieres efecto de revelación letra por letra
/*
gsap.utils.toArray('.section-title').forEach((title) => {
  const chars = title.textContent.split('');
  title.innerHTML = chars.map(char => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

  gsap.from(title.children, createScrollTrigger(title, {
    opacity: 0,
    y: 20,
    duration: 0.05,
    stagger: 0.03,
    ease: 'power2.out',
  }));
});
*/

// ==========================================
// LAZY LOADING DE IFRAME
// ==========================================

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

  if (!demoIframe.src || demoIframe.src === window.location.href) {
    demoIframe.dataset.src = 'https://cesargomez.8thwall.app/xv-renata/';
    demoIframe.removeAttribute('src');
  }

  iframeObserver.observe(demoIframe);
}

// ==========================================
// VALIDACIÓN DE FORMULARIO
// ==========================================

const contactForm = document.querySelector('.contact-card form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
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
    } else {
      // Tracking de conversión en Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'Contact Form Submit',
        });
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

// ==========================================
// ANALYTICS - EVENTOS PERSONALIZADOS
// ==========================================

// Track clicks en CTA buttons
document.querySelectorAll('.btn-primary, .btn-ghost').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (typeof gtag !== 'undefined') {
      const buttonText = e.target.textContent.trim();
      gtag('event', 'click', {
        event_category: 'CTA',
        event_label: buttonText,
      });
    }
  });
});

// Track demo views
if (demoIframe) {
  const demoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && typeof gtag !== 'undefined') {
          gtag('event', 'demo_view', {
            event_category: 'engagement',
            event_label: 'Demo AR Viewed',
          });
          demoObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  demoObserver.observe(demoIframe);
}

// Track scroll depth
let scrollDepth = 0;
const milestones = [25, 50, 75, 100];

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

  milestones.forEach((milestone) => {
    if (scrollPercent >= milestone && scrollDepth < milestone) {
      scrollDepth = milestone;
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll', {
          event_category: 'engagement',
          event_label: `Scrolled ${milestone}%`,
          value: milestone,
        });
      }
    }
  });
});

// ==========================================
// PERFORMANCE
// ==========================================

// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty('--transition-fast', '0.1s');
  document.documentElement.style.setProperty('--transition-smooth', '0.15s');
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
  '%c¡Hola! 👋',
  'font-size: 20px; font-weight: bold; color: #c85bff;'
);
console.log('%cMagicCam by 13Bodas', 'font-size: 14px; color: #00e5ff;');
console.log(
  '%c¿Interesado en trabajar con nosotros? Visita 13bodas.com',
  'font-size: 12px; color: #f4d0ff;'
);

// ==========================================
// REFRESH SCROLLTRIGGER ON RESIZE
// ==========================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
