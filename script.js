(() => {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const servicesWrap = document.querySelector('.nav-services');
  const servicesToggle = document.querySelector('.nav-services__toggle');
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

  const initRevealItems = () => {
    const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');

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
      return;
    }

    revealItems.forEach((item) => item.classList.add('is-visible'));
  };

  const hydrateFormspreeFields = () => {
    document.querySelectorAll('form[action*="formspree.io"]').forEach((form) => {
      const pageUrlInput = form.querySelector('input[name="page_url"]');
      const pageTitleInput = form.querySelector('input[name="page_title"]');

      if (pageUrlInput) pageUrlInput.value = window.location.href;
      if (pageTitleInput) pageTitleInput.value = document.title;
    });
  };

  const loadPartials = async () => {
    const partialSlots = document.querySelectorAll('[data-partial-src]');

    await Promise.all(
      Array.from(partialSlots).map(async (slot) => {
        if (!(slot instanceof HTMLElement)) return;
        const src = slot.dataset.partialSrc;
        if (!src) return;

        try {
          const response = await fetch(src);
          if (!response.ok) return;
          slot.innerHTML = await response.text();
        } catch (_error) {
          // Фолбэк — оставляем содержимое контейнера без изменений.
        }
      })
    );
  };

  document.addEventListener('DOMContentLoaded', async () => {
    await loadPartials();
    hydrateFormspreeFields();
    initRevealItems();
  });
})();
