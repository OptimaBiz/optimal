(() => {
  const body = document.body;
  const desktopMedia = window.matchMedia('(min-width: 1024px)');
  const mobileMedia = window.matchMedia('(max-width: 1023.98px)');
  const isDesktop = () => desktopMedia.matches;
  const isMobile = () => mobileMedia.matches;

  const initNavigation = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const servicesWrap = document.querySelector('.nav-services');
    const servicesToggle = document.querySelector('.nav-services__toggle');

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
      if (isDesktop()) closeMainMenu();
    };

    desktopMedia.addEventListener('change', handleViewportModeChange);
  };

  const initContactForms = () => {
    const shells = document.querySelectorAll('[data-contact-form-shell]');

    shells.forEach((shell, index) => {
      const form = shell.querySelector('.contact-form');
      const formNote = shell.querySelector('#form-note');
      const consentError = shell.querySelector('#consent-error');
      const consentCheckbox = shell.querySelector('input[name="consent"]');
      const consentModal = shell.querySelector('[data-consent-modal]');
      const modalDialog = shell.querySelector('.consent-modal__dialog');
      const openConsentButton = shell.querySelector('[data-consent-open]');
      const closeConsentButtons = shell.querySelectorAll('[data-consent-close]');

      if (!form || !formNote || !consentError || !consentCheckbox || !consentModal || !modalDialog || !openConsentButton) {
        return;
      }

      const suffix = `${Date.now()}-${index}`;
      const assignLinkedId = (inputSelector, labelSelector, prefix) => {
        const input = shell.querySelector(inputSelector);
        const label = shell.querySelector(labelSelector);
        if (!input) return;
        input.id = `${prefix}-${suffix}`;
        if (label) label.setAttribute('for', input.id);
      };

      assignLinkedId('[name="name"]', 'label[for="contact-name"]', 'contact-name');
      assignLinkedId('[name="contact"]', 'label[for="contact-channel"]', 'contact-channel');
      assignLinkedId('[name="message"]', 'label[for="contact-message"]', 'contact-message');
      assignLinkedId('[name="consent"]', '.form-consent__text', 'consent-checkbox');

      consentError.id = `consent-error-${suffix}`;
      formNote.id = `form-note-${suffix}`;
      const modalTitle = shell.querySelector('.consent-modal__title');
      if (modalTitle) modalTitle.id = `consent-modal-title-${suffix}`;

      consentCheckbox.setAttribute('aria-describedby', consentError.id);
      modalDialog.setAttribute('aria-labelledby', modalTitle?.id || '');

      const setContextFields = () => {
        const pageUrl = form.querySelector('input[name="page_url"]');
        const pageTitle = form.querySelector('input[name="page_title"]');
        if (pageUrl) pageUrl.value = window.location.href;
        if (pageTitle) pageTitle.value = document.title;
      };

      let lastFocusedTrigger = null;

      const closeModal = () => {
        consentModal.hidden = true;
        body.classList.remove('modal-open');
        document.removeEventListener('keydown', onEscClose);
        if (lastFocusedTrigger) lastFocusedTrigger.focus();
      };

      const openModal = (trigger) => {
        lastFocusedTrigger = trigger;
        consentModal.hidden = false;
        body.classList.add('modal-open');
        modalDialog.focus();
        document.addEventListener('keydown', onEscClose);
      };

      const onEscClose = (event) => {
        if (event.key === 'Escape') closeModal();
      };

      openConsentButton.addEventListener('click', () => openModal(openConsentButton));
      closeConsentButtons.forEach((button) => button.addEventListener('click', closeModal));

      consentCheckbox.addEventListener('input', () => {
        consentError.textContent = '';
        consentCheckbox.setCustomValidity('');
      });

      setContextFields();

      form.addEventListener('submit', (event) => {
        formNote.classList.remove('is-success', 'is-error');
        consentError.textContent = '';

        const formData = new FormData(form);
        const name = String(formData.get('name') || '').trim();
        const contact = String(formData.get('contact') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const hasConsent = consentCheckbox.checked;

        if (name.length < 2 || contact.length < 6 || message.length < 10) {
          event.preventDefault();
          formNote.textContent = 'Пожалуйста, заполните все обязательные поля корректно.';
          formNote.classList.add('is-error');
          return;
        }

        if (!hasConsent) {
          event.preventDefault();
          consentCheckbox.setCustomValidity('Подтвердите согласие на обработку персональных данных.');
          consentError.textContent = 'Подтвердите согласие на обработку персональных данных, чтобы отправить форму.';
          consentCheckbox.reportValidity();
          return;
        }

        consentCheckbox.setCustomValidity('');

        if (!form.action) {
          event.preventDefault();
          formNote.textContent = 'Спасибо! Заявка принята. Мы свяжемся с вами в рабочее время.';
          formNote.classList.add('is-success');
          form.reset();
          setContextFields();
        }
      });
    });
  };

  const initReveal = () => {
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
  };

  initNavigation();
  initContactForms();
  initReveal();
})();
