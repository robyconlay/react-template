import { expect, test } from '@playwright/test';

test('loads the home page and navigates to the example feature', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'React Template' }),
  ).toBeVisible();

  await page.getByRole('link', { name: /example feature/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Discussions' }),
  ).toBeVisible();
});
