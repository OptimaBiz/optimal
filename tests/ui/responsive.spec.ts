import { expect, test } from '@playwright/test';

test.describe('Responsive smoke checks', () => {
  test('mobile layout не ломается и без горизонтального скролла', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Этот сценарий проверяется только для mobile-проекта.');

    await page.goto('/index.html');

    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Разобрать вашу задачу' }).first()).toBeVisible();

    const hasHorizontalScroll = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - window.innerWidth > 1;
    });

    expect(hasHorizontalScroll).toBeFalsy();
  });
});
