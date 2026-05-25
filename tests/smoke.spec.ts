import { test, expect } from '@playwright/test';

type PageCase = {
  url: string;
  hasForm: boolean;
};

const pages: PageCase[] = [
  { url: '/index.html', hasForm: true },
  { url: '/uslugi.html', hasForm: true },
  { url: '/akkreditaciya.html', hasForm: true },
  { url: '/akkreditaciya-ispytatelnaya-laboratoriya.html', hasForm: true },
  { url: '/podtverzhdenie-kompetentnosti-os-smk.html', hasForm: true },
  { url: '/licenzirovanie.html', hasForm: true },
  { url: '/attestaciya.html', hasForm: true },
  { url: '/contacts.html', hasForm: false }
];

test.describe('Smoke: key pages render', () => {
  for (const pageCase of pages) {
    test(`${pageCase.url} opens and has key blocks`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(String(error)));

      const response = await page.goto(pageCase.url, { waitUntil: 'domcontentloaded' });
      expect(response?.ok(), `HTTP status should be 2xx for ${pageCase.url}`).toBeTruthy();

      await expect(page.locator('header.site-header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('section.hero')).toBeVisible();

      const cta = page.locator('section.hero a.button, section.hero a.btn, section.hero .hero-actions a, section.hero .hero__actions a').first();
      await expect(cta).toBeVisible();
      const href = await cta.getAttribute('href');
      expect(href && href.trim().length > 0, `CTA href should not be empty on ${pageCase.url}`).toBeTruthy();

      if (pageCase.hasForm) {
        const form = page.locator('form').first();
        await expect(form).toBeVisible();
        await expect(form.locator('input[name="name"], input[type="text"]').first()).toBeVisible();
        await expect(form.locator('input[name="phone"], input[type="tel"]').first()).toBeVisible();
        await expect(form.locator('button[type="submit"], input[type="submit"]').first()).toBeVisible();
      }

      const topButton = page.locator('.home-scroll-top').first();
      if (await topButton.count()) {
        await expect(topButton).toHaveClass(/home-scroll-top/);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(topButton).toHaveClass(/is-visible/);
        await topButton.click();
      }

      expect(errors, `No runtime page errors on ${pageCase.url}`).toEqual([]);
    });
  }
});

test.describe('Smoke: navigation and mobile menu', () => {
  test('services navigation menu opens', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
    test.skip((page.viewportSize()?.width || 0) < 1200, 'Desktop navigation check only');

    await expect(page.locator('header.site-header')).toBeVisible();
    const servicesToggle = page.locator('.nav-services__toggle:visible').first();
    await expect(servicesToggle).toBeVisible();
    await servicesToggle.click();
    await expect(page.locator('#services-menu-panel')).toBeVisible();
    await expect(page.locator('#services-menu-panel a[href*="akkreditaciya"]').first()).toBeVisible();
  });

  test('mobile menu opens', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Only relevant for mobile project');
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    const menuToggle = page.locator('.menu-toggle').first();
    await expect(menuToggle).toBeVisible();
    await menuToggle.click();
    await expect(page.locator('#site-menu')).toBeVisible();
  });
});
