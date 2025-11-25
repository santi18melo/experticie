// tests/e2e/login-all.spec.js
import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

const FRONTEND_URL = 'http://localhost:5175';
const BACKEND_URL = 'http://localhost:8000';
const TEST_PASSWORD = 'TestUser123!';
const ADMIN_PASSWORD = 'Prexcol123!';

let users = [];

test.describe('All Users Login Test', () => {
  test.beforeAll(async () => {
    // Get all users from backend
    try {
      // Use absolute path to python in venv
      const command = 'c:\\experticie-2\\.venv\\Scripts\\python.exe c:\\experticie-2\\backend\\manage.py list_users_for_tests';
      console.log("Executing:", command);
      const output = execSync(command, { encoding: 'utf-8' });
      users = JSON.parse(output);
      console.log(`Found ${users.length} users to test`);
      console.log("User emails:", users.map(u => `${u.email} (${u.rol})`).join(", "));
    } catch (error) {
      console.error('Failed to get user list:', error);
      users = [];
    }
  });

  // Find admin user (specific or any)
  const adminUser = users.find(u => u.email === 'admin@prexcol.com') || users.find(u => u.rol === 'admin');
  
  if (adminUser) {
    test(`Login test for ADMIN (${adminUser.email})`, async ({ page }) => {
      console.log(`Testing login for: ${adminUser.email}`);

      // Navigate to login
      await page.goto(`${FRONTEND_URL}/login`);
      await page.waitForTimeout(1000);

      // Fill login form
      await page.fill('input[type="email"]', adminUser.email);
      await page.fill('input[type="password"]', ADMIN_PASSWORD);

      // Click login button
      await page.click('button[type="submit"]');

      // Wait for potential error message or navigation
      try {
        await page.waitForURL('**/admin', { timeout: 5000 });
      } catch (e) {
        console.log('Navigation to /admin failed, checking for error messages...');
      }

      // Check results
      const currentUrl = page.url();
      const localStorage = await page.evaluate(() => {
        return {
          token: localStorage.getItem('token'),
          user: localStorage.getItem('user')
        };
      });

      // Get error message if any
      const errorMessage = await page.locator('div[style*="color: crimson"]').textContent().catch(() => null);

      console.log(`Result for ${adminUser.email}:`, {
        url: currentUrl,
        hasToken: !!localStorage.token,
        errorMessage: errorMessage
      });

      if (errorMessage) {
        console.error(`LOGIN FAILED WITH ERROR: ${errorMessage}`);
      }

      // Assertions
      expect(localStorage.token).toBeTruthy();
      expect(currentUrl).toContain('/admin');
    });
  } else {
    console.log('Admin user not found in list!');
  }
});
