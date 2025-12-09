// tests/e2e/login-debug.spec.js
import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:5176';
const ADMIN_EMAIL = 'admin@prexcol.com';
const ADMIN_PASSWORD = 'Prexcol123!';

test.describe('Login Flow Debug', () => {
  
  test('Should login successfully and redirect to admin', async ({ page }) => {
    console.log('\n=== Starting Login Test ===');
    
    // Step 1: Navigate to login
    console.log('Step 1: Navigating to login page...');
    await page.goto(`${FRONTEND_URL}/login`);
    await page.waitForLoadState('networkidle');
    console.log('✓ Page loaded');
    
    // Step 2: Take screenshot before login
    await page.screenshot({ path: 'test-results/01-before-login.png' });
    console.log('✓ Screenshot taken');
    
    // Step 3: Verify form elements exist
    console.log('Step 2: Verifying form elements...');
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.locator('button[type="submit"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    console.log('✓ All form elements visible');
    
    // Step 4: Fill form
    console.log('Step 3: Filling login form...');
    await emailInput.fill(ADMIN_EMAIL);
    await passwordInput.fill(ADMIN_PASSWORD);
    console.log(`✓ Filled email: ${ADMIN_EMAIL}`);
    
    // Step 5: Listen for network requests
    console.log('Step 4: Setting up network listener...');
    let loginResponse = null;
    page.on('response', async (response) => {
      if (response.url().includes('/auth/login/')) {
        loginResponse = response;
        console.log(`✓ Login API called: ${response.status()}`);
        try {
          const body = await response.json();
          console.log('Response body:', JSON.stringify(body, null, 2));
        } catch (e) {
          console.log('Could not parse response body');
        }
      }
    });
    
    // Step 6: Submit form
    console.log('Step 5: Submitting form...');
    await submitButton.click();
    console.log('✓ Form submitted');
    
    // Step 7: Wait for navigation or error
    console.log('Step 6: Waiting for response...');
    await page.waitForTimeout(3000);
    
    // Step 8: Take screenshot after submission
    await page.screenshot({ path: 'test-results/02-after-submit.png' });
    
    // Step 9: Check current URL
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Step 10: Check localStorage
    const localStorage = await page.evaluate(() => {
      return {
        token: window.localStorage.getItem('token'),
        refresh: window.localStorage.getItem('refresh'),
        user: window.localStorage.getItem('user')
      };
    });
    console.log('LocalStorage:', localStorage);
    
    // Step 11: Check for error messages
    const errorElement = page.locator('div[style*="crimson"]');
    const hasError = await errorElement.isVisible().catch(() => false);
    if (hasError) {
      const errorText = await errorElement.textContent();
      console.log(`❌ Error message: ${errorText}`);
    }
    
    // Step 12: Assertions
    console.log('\n=== Running Assertions ===');
    
    // Should have token
    expect(localStorage.token).toBeTruthy();
    console.log('✓ Token stored');
    
    // Should have user
    expect(localStorage.user).toBeTruthy();
    console.log('✓ User stored');
    
    // Should redirect to admin
    expect(currentUrl).toContain('/admin');
    console.log('✓ Redirected to admin');
    
    console.log('\n=== Test Passed ===\n');
  });
});
