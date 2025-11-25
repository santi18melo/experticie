// tests/e2e/login-simple.spec.js
import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:5175';

test.describe('PREXCOL Login Test', () => {
  
  test('Should login successfully with admin credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto(`${FRONTEND_URL}/login`);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Fill login form using data-testid selectors
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    
    // Click submit button
    await page.click('[data-testid="login-submit"]');
    
    // Wait for navigation (either to /admin or error)
    await page.waitForTimeout(3000);
    
    // Check results
    const currentUrl = page.url();
    console.log('Current URL after login:', currentUrl);
    
    // Verify token stored
    const token = await page.evaluate(() => localStorage.getItem('token'));
    console.log('Token stored:', !!token);
    
    // Verify user stored
    const user = await page.evaluate(() => localStorage.getItem('user'));
    console.log('User stored:', !!user);
    
    // Assertions
    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
    
    // Should redirect to admin dashboard
    expect(currentUrl).toContain('/admin');
  });
  
  test('Should show error with invalid credentials', async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/login`);
    await page.waitForLoadState('networkidle');
    
    // Try invalid credentials
    await page.fill('[data-testid="login-email"]', 'invalid@test.com');
    await page.fill('[data-testid="login-password"]', 'wrongpassword');
    await page.click('[data-testid="login-submit"]');
    
    await page.waitForTimeout(2000);
    
    // Should show error message (crimson color)
    const errorVisible = await page.locator('div[style*="crimson"]').isVisible();
    expect(errorVisible).toBeTruthy();
    
    // Should NOT have token
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeFalsy();
  });
});
