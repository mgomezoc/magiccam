// ==========================================
// INICIALIZACIÓN
// ==========================================

// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Registrar GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// CONFIGURACIÓN GLOBAL DE GSAP
// ==========================================

gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

// Configuración de ScrollTrigger por defecto
ScrollTrigger.defaults({
  toggleActions: 'play none none none', // Solo play, no reverse
  markers: false, // Cambiar a true para debugging
});

// ==========================================
// NAVEGACIÓN
// ==========================================

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

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

// Smooth scroll
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
// FUNCIÓN HELPER MEJORADA
// ==========================================

const animateElement = (element, animationProps, triggerProps = {}) => {
  // Asegurarse de que el elemento sea visible desde el inicio
  gsap.set(element, { opacity: 1, visibility: 'visible' });

  return gsap.from(element, {
    ...animationProps,
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none none',
      once: true, // Solo animar una vez
      ...triggerProps,
    },
  });
};

// ==========================================
// DETECTAR SI ESTÁ EN VIEWPORT AL CARGAR
// ==========================================

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// ==========================================
// 1. HERO ANIMATIONS - SIN SCROLLTRIGGER
// ==========================================

// Hero siempre visible, animaciones al cargar la página

// Fade up escalonado para hero copy
const heroElements = [
  { selector: '.gsap-fade-in', delay: 0 },
  { selector: '.gsap-fade-up-delay-1', delay: 0.2 },
  { selector: '.gsap-fade-up-delay-2', delay: 0.4 },
  { selector: '.gsap-fade-up-delay-3', delay: 0.6 },
  { selector: '.gsap-fade-up-delay-4', delay: 0.8 },
];

heroElements.forEach(({ selector, delay }) => {
  const element = document.querySelector(selector);
  if (element) {
    gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: 'power3.out',
      clearProps: 'all', // Limpiar propiedades después
    });
  }
});

// Hero visual con scale
const heroVisual = document.querySelector('.gsap-scale-in');
if (heroVisual) {
  gsap.from(heroVisual, {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: 'back.out(1.3)',
    clearProps: 'all',
  });
}

// ==========================================
// 2. SECTION HEADERS
// ==========================================

gsap.utils.toArray('.section-header').forEach((header) => {
  // Solo animar si no está en viewport inicial
  if (!isInViewport(header)) {
    animateElement(header, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }
});

// ==========================================
// 3. STEP CARDS
// ==========================================

gsap.utils.toArray('.step-card').forEach((card, index) => {
  if (!isInViewport(card)) {
    animateElement(card, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
    });
  }
});

// ==========================================
// 4. USECASE CARDS
// ==========================================

gsap.utils.toArray('.usecase-card').forEach((card, index) => {
  if (!isInViewport(card)) {
    animateElement(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
    });
  }
});

// ==========================================
// 5. BENEFIT ITEMS
// ==========================================

gsap.utils.toArray('.benefit-item').forEach((item, index) => {
  if (!isInViewport(item)) {
    animateElement(item, {
      x: -40,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'power2.out',
    });
  }
});

// Benefits panel
const benefitsPanel = document.querySelector('.benefits-panel');
if (benefitsPanel && !isInViewport(benefitsPanel)) {
  animateElement(benefitsPanel, {
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

// ==========================================
// 6. DEMO SECTION
// ==========================================

const demoPhone = document.querySelector('.demo-phone-container');
if (demoPhone && !isInViewport(demoPhone)) {
  animateElement(demoPhone, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
}

// Demo feature cards
gsap.utils.toArray('.demo-feature-card').forEach((card, index) => {
  if (!isInViewport(card)) {
    animateElement(card, {
      x: 50,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.15,
      ease: 'power2.out',
    });
  }
});

// ==========================================
// 7. PROCESS TIMELINE
// ==========================================

gsap.utils.toArray('.process-step').forEach((step, index) => {
  if (!isInViewport(step)) {
    const badge = step.querySelector('.process-badge');
    const content = step.querySelector('div:last-child');

    if (badge && content) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Asegurar visibilidad
      gsap.set([badge, content, step], { opacity: 1, visibility: 'visible' });

      tl.from(badge, {
        scale: 0,
        rotation: -180,
        duration: 0.5,
        ease: 'back.out(2)',
      }).from(
        content,
        {
          x: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }
  }
});

// ==========================================
// 8. CONTACT SECTION
// ==========================================

const contactText = document.querySelector('.contact-text');
if (contactText && !isInViewport(contactText)) {
  animateElement(contactText, {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

const contactCard = document.querySelector('.contact-card');
if (contactCard && !isInViewport(contactCard)) {
  animateElement(contactCard, {
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

// ==========================================
// 9. ANIMACIONES GENERALES CON CLASE gsap-card
// ==========================================

gsap.utils.toArray('.gsap-card').forEach((card, index) => {
  if (!isInViewport(card)) {
    animateElement(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }
});

// ==========================================
// 10. PARALLAX EFFECTS (OPCIONAL - MÁS SUTIL)
// ==========================================

// Solo en desktop
if (window.innerWidth > 768) {
  // Hero glows con parallax muy sutil
  const heroGlow1 = document.querySelector('.hero-glow-orb');
  if (heroGlow1) {
    gsap.to(heroGlow1, {
      y: -20,
      x: 10,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2, // Más suave
      },
    });
  }

  const heroGlow2 = document.querySelector('.hero-glow-orb-2');
  if (heroGlow2) {
    gsap.to(heroGlow2, {
      y: 20,
      x: -10,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }

  // Demo phone parallax sutil
  const demoPhoneParallax = document.querySelector('.demo-phone');
  if (demoPhoneParallax) {
    gsap.to(demoPhoneParallax, {
      y: -30,
      scrollTrigger: {
        trigger: '.demo-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }
}

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
      // Tracking de conversión
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'Contact Form Submit',
        });
      }
    }
  });

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

if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty('--transition-fast', '0.1s');
  document.documentElement.style.setProperty('--transition-smooth', '0.15s');
}

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

// ==========================================
// ASEGURAR QUE TODO ES VISIBLE AL FINAL
// ==========================================

// Después de 3 segundos, asegurar que todo es visible
setTimeout(() => {
  const allAnimatedElements = document.querySelectorAll(
    '.gsap-fade-up, .gsap-fade-up-delay-1, .gsap-fade-up-delay-2, .gsap-fade-up-delay-3, .gsap-fade-up-delay-4, .gsap-fade-in, .gsap-scale-in, .gsap-card, .gsap-slide-right, .gsap-phone, .gsap-timeline-item, .step-card, .usecase-card, .benefit-item, .demo-feature-card, .process-step, .section-header'
  );

  allAnimatedElements.forEach((el) => {
    gsap.set(el, {
      opacity: 1,
      visibility: 'visible',
      clearProps: 'transform',
    });
  });
}, 3000);

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
// DEBUG INFO (COMENTAR EN PRODUCCIÓN)
// ==========================================

console.log('%cGSAP Status:', 'color: #00e5ff; font-weight: bold');
console.log('GSAP loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');
console.log('Total ScrollTriggers:', ScrollTrigger.getAll().length);
