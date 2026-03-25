(() => {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const servicesWrap = document.querySelector('.nav-services');
  const servicesToggle = document.querySelector('.nav-services__toggle');
  const contactForm = document.querySelector('#contact-form');
  const formNote = document.querySelector('#form-note');
  const desktopMedia = window.matchMedia('(min-width: 1024px)');
  const mobileMedia = window.matchMedia('(max-width: 1023.98px)');
  const isDesktop = () => desktopMedia.matches;
  const isMobile = () => mobileMedia.matches;

  const closeServicesMenu = () => {
    if (!servicesWrap || !servicesToggle) return;
    servicesWrap.classList.remove('is-open');
    servicesToggle.setAttribute('aria-expanded', 'false');
  };

  const closeMainMenu = () => {
    if (!menuToggle || !siteNav) return;
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('menu-open', isOpen);
      if (!isOpen) closeServicesMenu();
    });
  }

  if (servicesWrap && servicesToggle) {
    servicesToggle.addEventListener('click', (event) => {
      if (isDesktop()) return;
      event.stopPropagation();
      const isOpen = servicesWrap.classList.toggle('is-open');
      servicesToggle.setAttribute('aria-expanded', String(isOpen));
    });

    servicesWrap.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;
      servicesWrap.classList.add('is-open');
      servicesToggle.setAttribute('aria-expanded', 'true');
    });

    servicesWrap.addEventListener('mouseleave', () => {
      if (isDesktop()) closeServicesMenu();
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (isMobile() && servicesWrap && !servicesWrap.contains(target)) {
      closeServicesMenu();
    }

    if (
      siteNav &&
      menuToggle &&
      !siteNav.contains(target) &&
      target !== menuToggle &&
      siteNav.classList.contains('is-open')
    ) {
      closeMainMenu();
    }
  });

  if (siteNav) {
    siteNav.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.tagName === 'A' && isMobile()) {
        closeMainMenu();
        closeServicesMenu();
      }
    });
  }

  const handleViewportModeChange = () => {
    closeServicesMenu();
    if (isDesktop()) {
      closeMainMenu();
    }
  };
  desktopMedia.addEventListener('change', handleViewportModeChange);

  if (contactForm && formNote) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      formNote.classList.remove('is-success', 'is-error');
      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const phone = String(formData.get('phone') || '').trim();

      if (name.length < 2 || phone.length < 6) {
        formNote.textContent = 'Проверьте имя и телефон: заполните поля корректно.';
        formNote.classList.add('is-error');
        return;
      }

      formNote.textContent = 'Спасибо! Заявка принята. Мы свяжемся с вами в рабочее время.';
      formNote.classList.add('is-success');
      contactForm.reset();
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
