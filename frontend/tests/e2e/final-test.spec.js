// tests/e2e/final-test.spec.js
import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('PREXCOL Final E2E Tests', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Test 1: Login successfully', async () => {
    console.log('=== TEST 1: LOGIN ===');
    
    await page.goto('http://localhost:5176/login');
    console.log('✓ Navigated to login');
    
    await page.waitForSelector('[data-testid="login-email"]', { state: 'visible', timeout: 10000 });
    console.log('✓ Email field visible');
    
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    console.log('✓ Filled email');
    
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    console.log('✓ Filled password');
    
    await page.click('[data-testid="login-submit"]');
    console.log('✓ Clicked submit');
    
    // Wait for navigation
    await page.waitForTimeout(5000);
    
    const url = page.url();
    console.log('Current URL:', url);
    
    const token = await page.evaluate(() => localStorage.getItem('token'));
    console.log('Token exists:', !!token);
    
    expect(token).toBeTruthy();
    expect(url).toContain('/admin');
    
    console.log('✅ TEST 1 PASSED');
  });

  test('Test 2: Cart persistence', async () => {
    console.log('=== TEST 2: CART ===');
    
    await page.goto('http://localhost:5176/productos');
    await page.waitForTimeout(2000);
    
    const addBtn = page.locator('button:has-text("Agregar")').first();
    const visible = await addBtn.isVisible().catch(() => false);
    
    if (!visible) {
      console.log('⊘ No products - skipping');
      test.skip();
      return;
    }
    
    await addBtn.click();
    await page.waitForTimeout(1000);
    
    const cart = await page.evaluate(() => {
      const data = localStorage.getItem('prexcol_cart');
      return data ? JSON.parse(data) : [];
    });
    
    expect(cart.length).toBeGreaterThan(0);
    console.log('✅ TEST 2 PASSED');
  });

  test('Test 3: Checkout', async () => {
    console.log('=== TEST 3: CHECKOUT ===');
    
    // Already logged in from Test 1
    await page.goto('http://localhost:5176/productos');
    await page.waitForTimeout(2000);
    
    const addBtn = page.locator('button:has-text("Agregar")').first();
    const visible = await addBtn.isVisible().catch(() => false);
    
    if (!visible) {
      console.log('⊘ No products - skipping');
      test.skip();
      return;
    }
    
    await addBtn.click();
    await page.waitForTimeout(1000);
    
    await page.goto('http://localhost:5176/checkout');
    await page.waitForTimeout(2000);
    
    await page.fill('textarea[name="direccion_envio"]', 'Test Address');
    await page.selectOption('select[name="metodo_pago"]', 'efectivo');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    const url = page.url();
    const hasSuccess = await page.locator('text=Pedido Realizado').isVisible().catch(() => false);
    
    expect(hasSuccess || url.includes('/orders')).toBeTruthy();
    console.log('✅ TEST 3 PASSED');
  });

  test('Test 4: Error handling', async () => {
    console.log('=== TEST 4: ERROR HANDLING ===');
    
    await page.goto('http://localhost:5176/productos');
    await page.waitForTimeout(2000);
    
    const addBtn = page.locator('button:has-text("Agregar")').first();
    const visible = await addBtn.isVisible().catch(() => false);
    
    if (!visible) {
      console.log('⊘ No products - skipping');
      test.skip();
      return;
    }
    
    await addBtn.click();
    await page.waitForTimeout(1000);
    
    const cartBefore = await page.evaluate(() => {
      const data = localStorage.getItem('prexcol_cart');
      return data ? JSON.parse(data) : [];
    });
    
    await page.goto('http://localhost:5176/checkout');
    await page.waitForTimeout(2000);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    
    const cartAfter = await page.evaluate(() => {
      const data = localStorage.getItem('prexcol_cart');
      return data ? JSON.parse(data) : [];
    });
    
    expect(cartAfter.length).toBe(cartBefore.length);
    console.log('✅ TEST 4 PASSED');
  });

  test('Test 5: Auto-logout', async () => {
    console.log('=== TEST 5: AUTO-LOGOUT ===');
    
    await page.evaluate(() => {
      localStorage.setItem('token', 'invalid_xyz');
    });
    
    await page.goto('http://localhost:5176/orders');
    await page.waitForTimeout(3000);
    
    expect(page.url()).toContain('/login');
    
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeFalsy();
    
    console.log('✅ TEST 5 PASSED');
  });

  test('Test 6: Order history', async () => {
    console.log('=== TEST 6: ORDER HISTORY ===');
    
    // Login again
    await page.goto('http://localhost:5176/login');
    await page.waitForSelector('[data-testid="login-email"]');
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    await page.click('[data-testid="login-submit"]');
    await page.waitForTimeout(5000);
    
    await page.goto('http://localhost:5176/orders');
    await page.waitForTimeout(2000);
    
    const hasOrders = await page.locator('text=Pedido #').isVisible().catch(() => false);
    const hasEmpty = await page.locator('text=No tienes pedidos').isVisible().catch(() => false);
    
    expect(hasOrders || hasEmpty).toBeTruthy();
    console.log('✅ TEST 6 PASSED');
  });
});
