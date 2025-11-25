// tests/e2e/login-fixed.spec.js
import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:5176';
const ADMIN_EMAIL = 'admin@prexcol.com';
const ADMIN_PASSWORD = 'Prexcol123!';

test.describe('Login Flow - Fixed', () => {
  
  test('Should login successfully and redirect to admin', async ({ page }) => {
    // Navigate to login
    await page.goto(`${FRONTEND_URL}/login`);
    await page.waitForLoadState('domcontentloaded');
    
    // Fill form
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    
    // Submit and wait for navigation
    await Promise.all([
      page.waitForURL('**/admin**', { timeout: 10000 }),
      page.click('button[type="submit"]')
    ]);
    
    // Verify success
    const currentUrl = page.url();
    expect(currentUrl).toContain('/admin');
    
    // Verify localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const user = await page.evaluate(() => localStorage.getItem('user'));
    
    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
    
    console.log('✅ Login test passed!');
  });
  
  test('Should show error with invalid credentials', async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/login`);
    await page.waitForLoadState('domcontentloaded');
    
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Wait for error to appear
    await page.waitForTimeout(2000);
    
    // Should show error
    const errorVisible = await page.locator('div[style*="crimson"]').isVisible();
    expect(errorVisible).toBeTruthy();
    
    // Should NOT have token
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeFalsy();
    
    console.log('✅ Error handling test passed!');
  });
});
