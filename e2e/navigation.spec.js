import { expect, test } from '@playwright/test';

// Regression coverage for the routing/footer findings in the audit.

test.describe('Routing', () => {
  test('an unknown route renders the 404 page, not a blank screen', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist');
    expect(response?.status()).toBeLessThan(500);
    await expect(page.getByText(/does not exist/i)).toBeVisible();
  });

  test('every Navbar link resolves to a real page (no 404)', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.locator('nav a[href^="/"]').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    for (const href of new Set(hrefs)) {
      const response = await page.goto(href.split('#')[0] || '/');
      expect(response?.status(), `link ${href} should not 404`).toBeLessThan(400);
    }
  });

  test('footer placeholder links are visibly marked "coming soon" rather than silently dead', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Privacy Policy').scrollIntoViewIfNeeded();
    await expect(page.getByText(/privacy policy/i).locator('..')).toContainText(/soon/i);
  });
});
