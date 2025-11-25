import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow a user to login and redirect to dashboard', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('/login');

    // 2. Fill in credentials (assuming these exist or are mocked)
    // Note: In a real e2e, we'd need to seed the DB or use a known user.
    // For this audit, I'll assume a standard test user.
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'admin123');

    // 3. Submit form
    await page.click('button[type="submit"]');

    // 4. Verify redirection (adjust URL as needed)
    await expect(page).toHaveURL(/\/dashboard|admin/);

    // 5. Verify token persistence
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    // Verify error message visibility
    await expect(page.getByText(/credenciales|error/i)).toBeVisible();
  });

  test('should redirect to login when accessing protected route without token', async ({ page }) => {
    // Clear context to ensure no token
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());

    await page.goto('/admin/users'); // Assuming this is protected
    await expect(page).toHaveURL(/\/login/);
  });
});
