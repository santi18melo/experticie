// tests/e2e/minimal-login.spec.js
import { test, expect } from '@playwright/test';

test('Minimal login test', async ({ page }) => {
  console.log('1. Navigating to login...');
  await page.goto('http://localhost:5176/login');
  await page.waitForTimeout(2000);
  
  console.log('2. Current URL:', page.url());
  console.log('3. Page title:', await page.title());
  
  console.log('4. Filling email...');
  await page.fill('input[type="email"]', 'admin@prexcol.com');
  
  console.log('5. Filling password...');
  await page.fill('input[type="password"]', 'Prexcol123!');
  
  console.log('6. Clicking submit...');
  await page.click('button[type="submit"]');
  
  console.log('7. Waiting 5 seconds...');
  await page.waitForTimeout(5000);
  
  console.log('8. Final URL:', page.url());
  
  const token = await page.evaluate(() => localStorage.getItem('token'));
  console.log('9. Token exists:', !!token);
  
  const user = await page.evaluate(() => localStorage.getItem('user'));
  console.log('10. User exists:', !!user);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/final-state.png' });
  
  console.log('11. Test complete');
});
