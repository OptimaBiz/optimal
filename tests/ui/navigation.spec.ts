import { expect, test } from '@playwright/test';

const keyPages = [
  { path: '/index.html', marker: '#hero' },
  { path: '/about.html', marker: 'h1' },
  { path: '/contacts.html', marker: 'h1' },
  { path: '/licenzirovanie.html', marker: 'h1' },
  { path: '/attestaciya.html', marker: 'h1' }
];

test.describe('Ключевые страницы и переходы', () => {
  test('страницы первого уровня доступны', async ({ page, request }) => {
    for (const target of keyPages) {
      const response = await request.get(target.path);
      expect(response.status(), `${target.path} should return HTTP 200`).toBe(200);

      await page.goto(target.path);
      await expect(page.locator(target.marker).first()).toBeVisible();
    }
  });

  test('главная навигация ведет на рабочие ссылки', async ({ page }) => {
    await page.goto('/index.html');

    await page.getByRole('link', { name: 'О нас' }).click();
    await expect(page).toHaveURL(/\/about\.html$/);

    await page.goto('/index.html');
    await page.getByRole('link', { name: 'Контакты' }).first().click();
    await expect(page).toHaveURL(/#contacts$/);
    await expect(page.locator('#contacts')).toBeVisible();
  });
});
