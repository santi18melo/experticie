// tests/e2e/simple-login.spec.js - TEST SIMPLE PARA VERIFICAR
import { test, expect } from '@playwright/test';

test('Simple login test', async ({ page }) => {
  console.log('Starting simple login test...');
  
  // Go to login page
  await page.goto('http://localhost:5176/login');
  console.log('✓ Navigated to login page');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  console.log('✓ Page loaded');
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/login-page.png' });
  console.log('✓ Screenshot taken');
  
  // Check if email field exists
  const emailField = await page.locator('[data-testid="login-email"]').count();
  console.log(`Email field count: ${emailField}`);
  
  if (emailField > 0) {
    // Fill form
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    console.log('✓ Form filled');
    
    // Click submit
    await page.click('[data-testid="login-submit"]');
    console.log('✓ Submit clicked');
    
    // Wait
    await page.waitForTimeout(5000);
    
    // Check token
    const token = await page.evaluate(() => localStorage.getItem('token'));
    console.log(`Token: ${token ? 'EXISTS' : 'NOT FOUND'}`);
    
    // Check URL
    const url = page.url();
    console.log(`Current URL: ${url}`);
    
    expect(token).toBeTruthy();
    expect(url).toContain('/admin');
    
    console.log('✅ TEST PASSED!');
  } else {
    console.log('❌ Email field not found - page not rendering correctly');
    throw new Error('Login form not found');
  }
});
