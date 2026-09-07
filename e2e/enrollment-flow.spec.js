import { expect, test } from '@playwright/test';

// Regression coverage for the EnrollmentModal bugs found in the audit:
// - phone validation was inconsistent, now backed by isValidPhone
// - double-submit was possible before the loading-disabled state was verified end-to-end
// - closing the modal mid-request used to risk a setState-after-unmount warning
//
// Note: "Enroll Now" appears three times on screen once the enrollment modal
// is open (two pricing-tier trigger buttons behind it, plus the form's own
// submit button), so every submit-button lookup below is scoped to the
// enrollment dialog itself to avoid a Playwright strict-mode ambiguity.

async function openEnrollmentModal(page) {
  await page.goto('/courses');
  // .course-card has a continuous CSS float animation that only pauses on a
  // real :hover; force bypasses Playwright's stability wait for it.
  await page.getByRole('button', { name: /explore program/i }).first().click({ force: true });
  await page.getByRole('button', { name: /enroll now/i }).first().click();
  // Scoped by the stable aria-labelledby attribute rather than the dialog's
  // accessible name: the name itself switches from "Enroll in <course>" to
  // "You're enrolled in <course>!" on success (which would make a
  // name-filtered locator go stale mid-test), and CourseDetailModal is also
  // role="dialog" and still mounted underneath, so an unscoped role query
  // would match both.
  const dialog = page.locator('[aria-labelledby="enrollment-modal-title"]');
  await expect(dialog).toBeVisible();
  return dialog;
}

// The frontend (5173) and API (4001) are different origins, so a mocked
// response still needs CORS headers or the browser rejects it client-side
// before the app's own code ever sees a response.
async function mockEnrollmentsApi(page, { delayMs = 0 } = {}) {
  await page.route('**/api/enrollments', async (route) => {
    if (route.request().method() === 'OPTIONS') {
      return route.fulfill({
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ data: { id: 'test-enrollment' } }),
    });
  });
}

test.describe('Enrollment flow', () => {
  test('shows inline validation before hitting the API', async ({ page }) => {
    const dialog = await openEnrollmentModal(page);
    await dialog.getByLabel(/name/i).fill('A');
    // Leaving email/phone blank would otherwise be caught by their own
    // native `required` constraints first; disable those so this test
    // isolates our JS-level isValidName check specifically.
    await dialog.locator('form').evaluate((form) => { form.noValidate = true; });
    await dialog.getByRole('button', { name: 'Enroll Now' }).click();
    await expect(dialog.getByText(/full name using letters only/i)).toBeVisible();
  });

  test('rejects a phone number shorter than 10 digits', async ({ page }) => {
    const dialog = await openEnrollmentModal(page);
    await dialog.getByLabel(/name/i).fill('Test Learner');
    await dialog.getByLabel(/email/i).fill('learner@example.com');
    await dialog.getByPlaceholder('98765 43210').fill('12345');
    // The input also carries a native minLength=10 constraint, which the
    // browser enforces before our JS handler runs. Disable it here so this
    // test actually exercises isValidPhone's own message, not the browser's.
    await dialog.locator('form').evaluate((form) => { form.noValidate = true; });
    await dialog.getByRole('button', { name: 'Enroll Now' }).click();
    await expect(dialog.getByText(/valid 10-digit phone number/i)).toBeVisible();
  });

  test('submit button disables while the request is in flight (no double submit)', async ({ page }) => {
    await mockEnrollmentsApi(page, { delayMs: 500 });

    const dialog = await openEnrollmentModal(page);
    await dialog.getByLabel(/name/i).fill('Test Learner');
    await dialog.getByLabel(/email/i).fill('learner@example.com');
    await dialog.getByPlaceholder('98765 43210').fill('9019944130');

    const submitButton = dialog.getByRole('button', { name: 'Enroll Now' });
    await submitButton.click();
    await expect(submitButton).toBeDisabled();
    await expect(dialog.getByText(/you're enrolled/i)).toBeVisible();
  });

  test('closing the modal mid-request does not throw a console error', async ({ page }) => {
    const consoleErrors = [];
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await mockEnrollmentsApi(page, { delayMs: 800 });

    const dialog = await openEnrollmentModal(page);
    await dialog.getByLabel(/name/i).fill('Test Learner');
    await dialog.getByLabel(/email/i).fill('learner@example.com');
    await dialog.getByPlaceholder('98765 43210').fill('9019944130');
    await dialog.getByRole('button', { name: 'Enroll Now' }).click();

    await dialog.getByRole('button', { name: /close enrollment form/i }).click();
    await page.waitForTimeout(1000);
    expect(consoleErrors).toHaveLength(0);
  });

  test('Escape key closes the modal', async ({ page }) => {
    const dialog = await openEnrollmentModal(page);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
