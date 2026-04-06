(() => {
  const body = document.body;
  const desktopMedia = window.matchMedia('(min-width: 1024px)');
  const mobileMedia = window.matchMedia('(max-width: 1023.98px)');
  const isDesktop = () => desktopMedia.matches;
  const isMobile = () => mobileMedia.matches;
  const currentPath = (() => {
    const raw = window.location.pathname.split('/').pop() || 'index.html';
    return raw.toLowerCase();
  })();

  const PAGE_META = {
    'uslugi.html': { title: 'Услуги', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги' }] },
    'akkreditaciya.html': { title: 'Аккредитация', family: 'accreditation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аккредитация' }] },
    'akkreditaciya-ispytatelnaya-laboratoriya.html': { title: 'Испытательная лаборатория', family: 'accreditation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аккредитация', href: 'akkreditaciya.html' }, { label: 'Испытательная лаборатория' }] },
    'akkreditaciya-organ-inspekcionnogo-kontrolya.html': { title: 'Орган инспекционного контроля', family: 'accreditation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аккредитация', href: 'akkreditaciya.html' }, { label: 'Орган инспекционного контроля' }] },
    'akkreditaciya-organ-po-sertifikacii.html': { title: 'Орган по сертификации', family: 'accreditation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аккредитация', href: 'akkreditaciya.html' }, { label: 'Орган по сертификации' }] },
    'sertifikaciya.html': { title: 'Сертификация', family: 'certification', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сертификация' }] },
    'gost-r-iso-9001-2015.html': { title: 'ГОСТ Р ИСО 9001:2015', family: 'certification', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сертификация', href: 'sertifikaciya.html' }, { label: 'ГОСТ Р ИСО 9001:2015' }] },
    'gost-r-45001-2020-ohsas.html': { title: 'ГОСТ Р ИСО 45001-2020', family: 'certification', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сертификация', href: 'sertifikaciya.html' }, { label: 'ГОСТ Р ИСО 45001-2020' }] },
    'gost-r-54934-2012-ohsas.html': { title: 'ГОСТ Р 54934-2012 (OHSAS 18001)', family: 'certification', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сертификация', href: 'sertifikaciya.html' }, { label: 'ГОСТ Р 54934-2012' }] },
    'gost-r-iso-14001-2016.html': { title: 'ГОСТ Р ИСО 14001-2016', family: 'certification', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сертификация', href: 'sertifikaciya.html' }, { label: 'ГОСТ Р ИСО 14001-2016' }] },
    'integrirovannaya-sistema-menedzhmenta-kachestva.html': { title: 'Интегрированная система', family: 'certification', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сертификация', href: 'sertifikaciya.html' }, { label: 'Интегрированная система' }] },
    'attestaciya.html': { title: 'Аттестация', family: 'attestation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аттестация' }] },
    'promyshlennaya-bezopasnost.html': { title: 'Промышленная безопасность', family: 'attestation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аттестация', href: 'attestaciya.html' }, { label: 'Промышленная безопасность' }] },
    'tehnologii-svarki-naks.html': { title: 'Технологии сварки НАКС', family: 'attestation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аттестация', href: 'attestaciya.html' }, { label: 'Технологии сварки НАКС' }] },
    'personal-naks.html': { title: 'Персонал НАКС', family: 'attestation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аттестация', href: 'attestaciya.html' }, { label: 'Персонал НАКС' }] },
    'attestaciya-naks.html': { title: 'Аттестация НАКС', family: 'attestation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аттестация', href: 'attestaciya.html' }, { label: 'Аттестация НАКС' }] },
    'elektrobezopasnost.html': { title: 'Электробезопасность', family: 'attestation', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Аттестация', href: 'attestaciya.html' }, { label: 'Электробезопасность' }] },
    'licenzirovanie.html': { title: 'Лицензирование', family: 'licensing', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Лицензирование' }] },
    'licenziya-medicinskaya-deyatelnost.html': { title: 'Лицензия на медицинскую деятельность', family: 'licensing', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Лицензирование', href: 'licenzirovanie.html' }, { label: 'Лицензия на медицинскую деятельность' }] },
    'licenziya-mchs.html': { title: 'Лицензия МЧС', family: 'licensing', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Лицензирование', href: 'licenzirovanie.html' }, { label: 'Лицензия МЧС' }] },
    'licenziya-minkult.html': { title: 'Лицензия Минкультуры', family: 'licensing', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Лицензирование', href: 'licenzirovanie.html' }, { label: 'Лицензия Минкультуры' }] },
    'dop-uslugi.html': { title: 'Сопутствующие услуги', family: 'adjacent', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сопутствующие услуги' }] },
    'obuchenie-povyshenie-kvalifikacii.html': { title: 'Повышение квалификации', family: 'adjacent', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сопутствующие услуги', href: 'dop-uslugi.html' }, { label: 'Повышение квалификации' }] },
    'profperepodgotovka.html': { title: 'Профпереподготовка', family: 'adjacent', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сопутствующие услуги', href: 'dop-uslugi.html' }, { label: 'Профпереподготовка' }] },
    'okhrana-truda.html': { title: 'Охрана труда', family: 'adjacent', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сопутствующие услуги', href: 'dop-uslugi.html' }, { label: 'Охрана труда' }] },
    'obuchenie-po-okhrane-truda.html': { title: 'Обучение по охране труда', family: 'adjacent', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сопутствующие услуги', href: 'dop-uslugi.html' }, { label: 'Обучение по охране труда' }] },
    'pozharnaya-bezopasnost.html': { title: 'Пожарная безопасность', family: 'adjacent', crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Услуги', href: 'uslugi.html' }, { label: 'Сопутствующие услуги', href: 'dop-uslugi.html' }, { label: 'Пожарная безопасность' }] },
    'about.html': { title: 'О компании', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'О компании' }] },
    'contacts.html': { title: 'Контакты', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Контакты' }] },
    'requisites.html': { title: 'Реквизиты', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Реквизиты' }] },
    'privacy-policy.html': { title: 'Политика конфиденциальности', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Политика конфиденциальности' }] },
    'personal-data.html': { title: 'Персональные данные', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Персональные данные' }] },
    'oferta.html': { title: 'Оферта', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Оферта' }] },
    'legal.html': { title: 'Юридическая информация', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Юридическая информация' }] },
    'medicinskaya-deyatelnost.html': { title: 'Медицинская деятельность', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'Медицинская деятельность' }] },
    'sro-proektirovanie.html': { title: 'СРО проектирование', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'СРО проектирование' }] },
    'sro-stroitelstvo.html': { title: 'СРО строительство', family: null, crumbs: [{ label: 'Главная', href: 'index.html' }, { label: 'СРО строительство' }] }
  };

  const initPageTaxonomy = () => {
    if (currentPath === 'index.html') return;
    body.classList.add('page-internal');
    const meta = PAGE_META[currentPath];
    if (!meta?.family) return;
    body.classList.add(`page-family--${meta.family}`);
  };

  const normalizeBreadcrumbs = () => {
    if (currentPath === 'index.html') return;
    const main = document.querySelector('main');
    const header = document.querySelector('.site-header');
    if (!main || !header) return;

    const breadcrumbNodes = Array.from(document.querySelectorAll('.breadcrumbs'));
    const activeNode = breadcrumbNodes[0] || document.createElement('nav');
    breadcrumbNodes.slice(1).forEach((node) => node.remove());

    activeNode.className = 'container breadcrumbs';
    activeNode.setAttribute('aria-label', 'Хлебные крошки');

    const fallbackTitle = document.querySelector('h1')?.textContent?.trim() || document.title;
    const crumbs = PAGE_META[currentPath]?.crumbs || [{ label: 'Главная', href: 'index.html' }, { label: fallbackTitle }];
    const itemsMarkup = crumbs
      .map((item, index) => {
        const isCurrent = index === crumbs.length - 1;
        const content = isCurrent || !item.href
          ? `<span class="breadcrumbs__current" aria-current="page">${item.label}</span>`
          : `<a href="${item.href}">${item.label}</a>`;
        return `<li class="breadcrumbs__item">${content}</li>`;
      })
      .join('');

    activeNode.innerHTML = `<ol class="breadcrumbs__list">${itemsMarkup}</ol>`;
    main.prepend(activeNode);
  };

  const initNavigation = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const servicesWrap = document.querySelector('.nav-services');
    const servicesToggle = document.querySelector('.nav-services__toggle');
    const servicesDesktopPanel = document.querySelector('#services-menu-panel');

    const updateDesktopMenuPosition = () => {
      if (!servicesDesktopPanel || !servicesWrap || !isDesktop()) return;
      servicesDesktopPanel.style.setProperty('--services-menu-offset-x', '0px');
      const rect = servicesDesktopPanel.getBoundingClientRect();
      const viewportPadding = 8;
      let offset = 0;
      if (rect.left < viewportPadding) {
        offset = viewportPadding - rect.left;
      } else if (rect.right > window.innerWidth - viewportPadding) {
        offset = (window.innerWidth - viewportPadding) - rect.right;
      }
      servicesDesktopPanel.style.setProperty('--services-menu-offset-x', `${Math.round(offset)}px`);
    };

    const closeServicesMenu = ({ returnFocus = false } = {}) => {
      if (!servicesWrap || !servicesToggle) return;
      servicesWrap.classList.remove('is-open');
      servicesToggle.setAttribute('aria-expanded', 'false');
      if (servicesDesktopPanel) {
        servicesDesktopPanel.style.setProperty('--services-menu-offset-x', '0px');
      }
      if (returnFocus) {
        servicesToggle.focus();
      }
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
        updateDesktopMenuPosition();
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

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !servicesWrap?.classList.contains('is-open')) return;
      closeServicesMenu({ returnFocus: true });
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
    window.addEventListener('resize', () => {
      if (servicesWrap?.classList.contains('is-open')) updateDesktopMenuPosition();
    });
  };


  const PARTIAL_FALLBACKS = {
    'partials/contact-block.html': `
<aside class="contact-summary" aria-label="Контактная информация">
  <header class="contact-summary__header">
    <span class="contact-summary__eyebrow">Контакты</span>
    <h2 class="contact-summary__title contact-panel__title">Как с нами связаться</h2>
    <p class="contact-summary__subtitle">Отвечаем в течение рабочего дня. Можно написать или позвонить — подскажем, с чего начать.</p>
  </header>
  <div class="contact-summary__body">
    <section class="contact-summary__section contact-summary__section--card" aria-label="Email">
      <span class="contact-summary__label">Email</span>
      <a class="contact-summary__value contact-summary__value--link" href="mailto:hello@optimaloption.ru"><i class="fa-solid fa-envelope contact-summary__icon" aria-hidden="true"></i><span>hello@optimaloption.ru</span></a>
    </section>
    <section class="contact-summary__section contact-summary__section--card" aria-label="Телефон">
      <span class="contact-summary__label">Телефон</span>
      <a class="contact-summary__value contact-summary__value--link" href="tel:+78123898178"><i class="fa-solid fa-phone contact-summary__icon" aria-hidden="true"></i><span>+7 812 38-98-178</span></a>
    </section>
    <section class="contact-summary__section contact-summary__section--geo" aria-label="География работы">
      <span class="contact-summary__label"><i class="fa-solid fa-location-dot contact-summary__icon" aria-hidden="true"></i><span>География работы</span></span>
      <p class="contact-summary__value">Базируемся в Санкт-Петербурге</p>
      <p class="contact-summary__value contact-summary__value--regular">Работаем по всей России</p>
      <p class="contact-summary__meta">Дистанционно и очно — в зависимости от задачи</p>
    </section>
    <section class="contact-summary__section contact-summary__section--trust" aria-label="Факторы доверия">
      <span class="contact-summary__label">Почему нам доверяют</span>
      <ul class="contact-summary__trust-list">
        <li>15+ лет опыта</li>
        <li>Работаем с регуляторами</li>
        <li>Сопровождаем до результата</li>
      </ul>
    </section>
  </div>
</aside>`,
    'partials/contact-form.html': `
<div class="contact-form-shell" data-contact-form-shell>
  <form class="contact-form" action="https://formspree.io/f/mjgpywnr" method="POST" novalidate>
    <div class="contact-form__header">
      <h2 class="contact-form__title contact-panel__title">Форма для связи</h2>
      <p class="contact-form__subtitle">Оставьте контакты и кратко опишите запрос. Мы свяжемся с вами и предложим оптимальный формат решения.</p>
    </div>
    <input type="hidden" name="page_url" value="" />
    <input type="hidden" name="page_title" value="" />
    <input type="hidden" name="email" value="" />
    <input type="hidden" name="_subject" value="Новая заявка с сайта optimaloption.ru" />
    <input type="hidden" name="_language" value="ru" />
    <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="contact-form__gotcha" aria-hidden="true" />
    <input type="hidden" name="_next" value="/" />
    <div class="contact-form__grid">
      <div class="form-field"><label class="form-label" for="contact-name">Как к вам обращаться</label><input class="form-input" id="contact-name" name="name" type="text" placeholder="Имя" autocomplete="name" required /></div>
      <div class="form-field"><label class="form-label" for="contact-channel">Email или телефон</label><input class="form-input" id="contact-channel" name="contact" type="text" placeholder="example@mail.ru / телефон в любом формате" autocomplete="email" required /></div>
      <div class="form-field"><label class="form-label" for="contact-message">Кратко опишите задачу</label><textarea class="form-textarea" id="contact-message" name="message" rows="5" placeholder="Например: нужна аккредитация, лицензия, подготовка документов, сопровождение" required></textarea></div>
    </div>
    <div class="form-consent contact-form__consent">
      <input class="form-consent__checkbox contact-form__consent-checkbox" type="checkbox" id="consent-checkbox" name="consent" required aria-describedby="consent-error" />
      <label class="form-consent__text contact-form__consent-text" for="consent-checkbox">
        <span class="form-consent__lead">Даю</span>
        <button type="button" class="form-consent__link" data-consent-open>согласие на обработку персональных данных</button>
        <span class="form-consent__tail">и принимаю <a href="privacy-policy.html">Политику конфиденциальности</a>.</span>
      </label>
    </div>
    <p class="form-note form-note--error" id="consent-error" aria-live="polite"></p>
    <p class="form-note" id="form-note" role="status" aria-live="polite"></p>
    <button class="button button--primary form-submit" type="submit">Отправить заявку</button>
  </form>
  <div class="contact-success" data-contact-success hidden>
    <div class="contact-success__icon" aria-hidden="true">✓</div>
    <h3 class="contact-success__title">Заявка отправлена</h3>
    <p class="contact-success__text">Мы получили ваше сообщение и свяжемся с вами в рабочее время.</p>
    <button class="button contact-success__reset" type="button" data-contact-reset>Отправить ещё одну заявку</button>
  </div>
  <div class="consent-modal" data-consent-modal hidden>
    <div class="consent-modal__backdrop" data-consent-close></div>
    <div class="consent-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="consent-modal-title" tabindex="-1">
      <div class="consent-modal__header"><h3 class="consent-modal__title" id="consent-modal-title">Согласие на обработку персональных данных</h3><button class="consent-modal__close" type="button" data-consent-close aria-label="Закрыть окно">×</button></div>
      <div class="consent-modal__body"><p>Я, заполняя форму на сайте, даю согласие на обработку моих персональных данных: имени, телефона, адреса электронной почты, а также иных сведений, указанных в сообщении.</p><p>Обработка персональных данных осуществляется в целях рассмотрения обращения, обратной связи со мной, подготовки ответа на запрос и предложения услуг по заявленной задаче.</p><p>Под обработкой персональных данных понимаются сбор, запись, систематизация, накопление, хранение, уточнение, использование и удаление персональных данных в соответствии с действующим законодательством Российской Федерации.</p><p>Согласие действует до достижения целей обработки персональных данных либо до момента его отзыва субъектом персональных данных.</p><p class="consent-modal__policy-note">Полный порядок обработки персональных данных размещён на странице <a href="privacy-policy.html">Политики конфиденциальности</a>.</p></div>
    </div>
  </div>
</div>`
  };

  const loadPartials = async () => {
    const includeNodes = Array.from(document.querySelectorAll('[data-include]'));
    if (!includeNodes.length) return;

    const loadedPartials = await Promise.all(
      includeNodes.map(async (node) => {
        const source = node.getAttribute('data-include');
        if (!source) return { node, content: '', isEmpty: true };
        try {
          const response = await fetch(source, { cache: 'no-store' });
          if (!response.ok) throw new Error(`Failed to load partial: ${source}`);
          return { node, content: await response.text(), isEmpty: false };
        } catch (error) {
          console.error('[partials] Ошибка загрузки', source, error);
          const fallback = PARTIAL_FALLBACKS[source];
          if (fallback) {
            console.warn('[partials] Использован fallback-шаблон для', source);
            return { node, content: fallback, isEmpty: false };
          }
          return { node, content: '', isEmpty: true };
        }
      })
    );

    loadedPartials.forEach(({ node, content, isEmpty }) => {
      if (!isEmpty && content.trim()) {
        node.innerHTML = content;
      }
    });
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
      const successState = shell.querySelector('[data-contact-success]');
      const resetButton = shell.querySelector('[data-contact-reset]');
      const submitButton = form?.querySelector('button[type="submit"]');
      const contactInput = form?.querySelector('input[name="contact"]');

      if (!form || !formNote || !consentError || !consentCheckbox || !consentModal || !modalDialog || !openConsentButton || !submitButton || !contactInput) {
        return;
      }

      contactInput.setAttribute('autocomplete', 'off');
      contactInput.setAttribute('inputmode', 'text');

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
        const emailField = form.querySelector('input[name="email"]');
        const nextUrl = form.querySelector('input[name="_next"]');
        if (pageUrl) pageUrl.value = window.location.href;
        if (pageTitle) pageTitle.value = document.title;
        if (emailField) {
          const contactValue = String(contactInput.value || '').trim();
          emailField.value = emailRegex.test(contactValue) ? contactValue : '';
        }
        if (nextUrl) nextUrl.value = window.location.href;
      };


      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validateContactField = (rawValue) => {
        const value = String(rawValue || '').trim();
        if (!value) return false;
        if (emailRegex.test(value)) return true;
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length >= 7;
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

      contactInput.addEventListener('input', () => {
        contactInput.setCustomValidity('');
      });

      const setSubmittingState = (isSubmitting) => {
        submitButton.disabled = isSubmitting;
        submitButton.classList.toggle('is-loading', isSubmitting);
        submitButton.setAttribute('aria-busy', String(isSubmitting));
        submitButton.textContent = isSubmitting ? 'Отправка...' : 'Отправить заявку';
      };

      const showSuccessState = () => {
        form.hidden = true;
        if (successState) {
          successState.hidden = false;
        }
      };

      const clearFormFields = () => {
        form.reset();
        formNote.textContent = '';
        consentError.textContent = '';
        consentCheckbox.setCustomValidity('');
        contactInput.setCustomValidity('');
        setContextFields();
      };

      const resetToFormState = () => {
        if (successState) {
          successState.hidden = true;
        }
        form.hidden = false;
        clearFormFields();
      };

      if (resetButton) {
        resetButton.addEventListener('click', resetToFormState);
      }

      form.hidden = false;
      if (successState) {
        successState.hidden = true;
      }

      setContextFields();

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        formNote.classList.remove('is-success', 'is-error');
        consentError.textContent = '';

        const formData = new FormData(form);
        const name = String(formData.get('name') || '').trim();
        const contact = String(formData.get('contact') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const hasConsent = consentCheckbox.checked;

        if (name.length < 2 || message.length < 10) {
          formNote.textContent = 'Пожалуйста, заполните все обязательные поля корректно.';
          formNote.classList.add('is-error');
          return;
        }

        if (!validateContactField(contact)) {
          contactInput.setCustomValidity('Укажите email или телефон не короче 7 цифр');
          contactInput.reportValidity();
          formNote.textContent = 'Укажите email или телефон не короче 7 цифр';
          formNote.classList.add('is-error');
          return;
        }

        if (!hasConsent) {
          consentCheckbox.setCustomValidity('Подтвердите согласие на обработку персональных данных.');
          consentError.textContent = 'Подтвердите согласие на обработку персональных данных, чтобы отправить форму.';
          consentCheckbox.reportValidity();
          return;
        }

        const emailField = form.querySelector('input[name="email"]');
        if (emailField) {
          emailField.value = emailRegex.test(contact) ? contact : '';
          formData.set('email', emailField.value);
        }

        consentCheckbox.setCustomValidity('');
        setSubmittingState(true);

        try {
          if (form.action) {
            const response = await fetch(form.action, {
              method: form.method || 'POST',
              body: formData,
              headers: {
                Accept: 'application/json'
              }
            });

            if (!response.ok) {
              throw new Error(`Submit failed: ${response.status}`);
            }
          }

          clearFormFields();
          showSuccessState();
        } catch (error) {
          console.error('[contact-form] Ошибка отправки формы', error);
          formNote.textContent = 'Не удалось отправить заявку. Попробуйте снова или свяжитесь с нами по телефону.';
          formNote.classList.add('is-error');
        } finally {
          setSubmittingState(false);
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

  const initMobileServiceCardFocus = () => {
    const mobileBreakpoint = window.matchMedia('(max-width: 767.98px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cards = Array.from(document.querySelectorAll('.section--services-overview .service-card'));
    if (!cards.length) return;

    let observer = null;

    const clearActive = () => {
      cards.forEach((card) => card.classList.remove('is-active'));
    };

    const enableFocusEffect = () => {
      clearActive();
      if (!('IntersectionObserver' in window)) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter((entry) => entry.isIntersecting);
          if (!visibleEntries.length) return;

          const bestEntry = visibleEntries.reduce((best, entry) => (
            entry.intersectionRatio > best.intersectionRatio ? entry : best
          ));

          cards.forEach((card) => card.classList.toggle('is-active', card === bestEntry.target));
        },
        {
          root: null,
          threshold: [0.35, 0.5, 0.7],
          rootMargin: '-34% 0px -34% 0px'
        }
      );

      cards.forEach((card) => observer.observe(card));
    };

    const disableFocusEffect = () => {
      observer?.disconnect();
      observer = null;
      clearActive();
    };

    const syncMode = () => {
      if (mobileBreakpoint.matches) {
        enableFocusEffect();
      } else {
        disableFocusEffect();
      }
    };

    syncMode();
    mobileBreakpoint.addEventListener('change', syncMode);
    reduceMotion.addEventListener('change', syncMode);
  };

  const initScrollToTop = () => {
    const buttons = Array.from(document.querySelectorAll('.home-scroll-top'));
    if (!buttons.length) return;

    const revealOffset = () => Math.max(360, window.innerHeight * 0.6);
    let rafId = null;

    const updateButtonsVisibility = () => {
      const shouldShow = window.scrollY > revealOffset();
      buttons.forEach((button) => {
        button.classList.toggle('is-visible', shouldShow);
        button.setAttribute('aria-hidden', String(!shouldShow));
      });
    };

    const requestVisibilityUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateButtonsVisibility();
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });

    window.addEventListener('scroll', requestVisibilityUpdate, { passive: true });
    window.addEventListener('resize', requestVisibilityUpdate);
    updateButtonsVisibility();
  };

  const bootstrap = async () => {
    initPageTaxonomy();
    normalizeBreadcrumbs();
    await loadPartials();
    initNavigation();
    initContactForms();
    initReveal();
    initMobileServiceCardFocus();
    initScrollToTop();
  };

  bootstrap();
})();
