// tests/e2e/full-user-journey.spec.js
import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:5175';

test.describe('Full User Journey: Register -> Login -> Dashboard -> Logout', () => {
  
  // Generate unique user for each run
  const timestamp = Date.now();
  const user = {
    nombre: `Test User ${timestamp}`,
    email: `user${timestamp}@test.com`,
    password: 'TestUser123!',
    telefono: '3001234567',
    direccion: 'Calle Test 123'
  };

  test('should complete the full authentication and dashboard flow', async ({ page }) => {
    // Listen to browser console logs
    page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));

    // 1. REGISTER
    console.log(`Starting registration for ${user.email}...`);
    await page.goto(`${FRONTEND_URL}/register`);
    
    await page.fill('[data-testid="register-nombre"]', user.nombre);
    await page.fill('[data-testid="register-email"]', user.email);
    await page.fill('[data-testid="register-password"]', user.password);
    await page.fill('[data-testid="register-telefono"]', user.telefono);
    await page.fill('[data-testid="register-direccion"]', user.direccion);
    
    await page.click('[data-testid="register-submit"]');
    
    // Wait for redirection to login or dashboard
    // The Register component redirects to /login after 2 seconds
    await page.waitForURL('**/login', { timeout: 10000 });
    console.log('Redirected to login page after registration.');

    // 2. LOGIN
    console.log('Logging in...');
    await page.fill('[data-testid="login-email"]', user.email);
    await page.fill('[data-testid="login-password"]', user.password);
    await page.click('[data-testid="login-submit"]');

    // Wait for redirection to cliente dashboard (default role for registration)
    await page.waitForURL('**/cliente', { timeout: 10000 });
    console.log('Logged in and redirected to cliente dashboard.');

    // Verify user info on dashboard
    await expect(page.locator('h2')).toContainText(user.nombre);
    await expect(page.locator('body')).toContainText(user.email);

    // 3. TEST DASHBOARD BUTTONS
    console.log('Testing dashboard buttons...');

    // Profile
    await page.click('[data-testid="dashboard-profile"]');
    await page.waitForURL('**/profile');
    console.log('Visited Profile');
    await page.goBack();
    await page.waitForURL('**/dashboard');

    // Orders
    await page.click('[data-testid="dashboard-orders"]');
    await page.waitForURL('**/orders');
    console.log('Visited Orders');
    await page.goBack();
    await page.waitForURL('**/dashboard');

    // Notifications
    await page.click('[data-testid="dashboard-notifications"]');
    await page.waitForURL('**/notifications');
    console.log('Visited Notifications');
    await page.goBack();
    await page.waitForURL('**/dashboard');

    // Settings
    await page.click('[data-testid="dashboard-settings"]');
    await page.waitForURL('**/settings');
    console.log('Visited Settings');
    await page.goBack();
    await page.waitForURL('**/dashboard');

    // Products (Available for 'cliente' role by default)
    // Note: Register defaults to 'cliente' usually, or we need to check if button exists
    const productsBtn = page.locator('[data-testid="dashboard-products"]');
    if (await productsBtn.isVisible()) {
        await productsBtn.click();
        await page.waitForURL('**/productos');
        console.log('Visited Products');
        await page.goBack();
        await page.waitForURL('**/dashboard');
    }

    // Cart (Available for 'cliente' role by default)
    const cartBtn = page.locator('[data-testid="dashboard-cart"]');
    if (await cartBtn.isVisible()) {
        await cartBtn.click();
        await page.waitForURL('**/cart');
        console.log('Visited Cart');
        await page.goBack();
        await page.waitForURL('**/dashboard');
    }

    // 4. LOGOUT
    console.log('Logging out...');
    await page.click('[data-testid="dashboard-logout"]');
    
    // Wait for redirection to login
    await page.waitForURL('**/login');
    console.log('Logged out successfully.');

    // Verify localStorage is cleared (optional but good practice)
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });
});
