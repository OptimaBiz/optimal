import { expect, test } from '@playwright/test';

test.describe('Главная страница и форма', () => {
  test('главная открывается, hero и CTA видны', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => consoleErrors.push(error.message));

    await page.goto('/index.html');

    await expect(page).toHaveTitle(/Оптимальный вариант/i);
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Разобрать вашу задачу' }).first()).toBeVisible();

    expect(consoleErrors, `JS errors on page: ${consoleErrors.join('\n')}`).toHaveLength(0);
  });

  test('контактная форма доступна для взаимодействия', async ({ page }) => {
    await page.goto('/index.html#contacts');

    const form = page.locator('#contacts .contact-form').first();
    await expect(form).toBeVisible();

    await expect(form.locator('input[name="name"]')).toBeVisible();
    await expect(form.locator('input[name="contact"]')).toBeVisible();
    await expect(form.locator('textarea[name="message"]')).toBeVisible();
    await expect(form.locator('input[name="consent"]')).toBeVisible();
    await expect(form.locator('button[type="submit"]')).toBeVisible();

    await form.locator('input[name="name"]').fill('Playwright Test');
    await form.locator('input[name="contact"]').fill('test@example.com');
    await form.locator('textarea[name="message"]').fill('Проверка базовой доступности формы.');
    await form.locator('input[name="consent"]').check();

    await expect(form.locator('input[name="name"]')).toHaveValue('Playwright Test');
  });
});
