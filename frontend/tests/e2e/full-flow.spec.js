// tests/e2e/full-flow.spec.js - FINAL DELIVERY VERSION
import { test, expect } from '@playwright/test';

test.describe('PREXCOL Full Flow E2E Tests', () => {
  
  test('Test 1: Login flow with role-based redirection', async ({ page }) => {
    console.log('=== TEST 1: LOGIN ===');
    
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Wait for form elements
    await page.waitForSelector('[data-testid="login-email"]', { state: 'visible', timeout: 60000 });
    await page.waitForSelector('[data-testid="login-password"]', { state: 'visible', timeout: 60000 });
    await page.waitForSelector('[data-testid="login-submit"]', { state: 'visible', timeout: 60000 });
    
    // Fill form
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    
    // Submit
    await page.click('[data-testid="login-submit"]');
    
    // Wait for navigation
    await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle');
    
    // Verify
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
    expect(page.url()).toContain('/admin');
    
    console.log('✅ TEST 1 PASSED');
  });

  test('Test 2: Cart persistence', async ({ page }) => {
    console.log('=== TEST 2: CART ===');
    
    await page.goto('/productos');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const addBtn = page.locator('button:has-text("Agregar")').first();
    const visible = await addBtn.isVisible().catch(() => false);
    
    if (!visible) {
      console.log('⊘ No products available - skipping');
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
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const cartAfter = await page.evaluate(() => {
      const data = localStorage.getItem('prexcol_cart');
      return data ? JSON.parse(data) : [];
    });
    
    expect(cartAfter.length).toBe(cart.length);
    
    console.log('✅ TEST 2 PASSED');
  });

  test('Test 3: Checkout flow', async ({ page }) => {
    console.log('=== TEST 3: CHECKOUT ===');
    
    // Login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="login-email"]', { state: 'visible' });
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    await page.click('[data-testid="login-submit"]');
    await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle');
    
    // Add to cart
    await page.goto('/productos');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const addBtn = page.locator('button:has-text("Agregar")').first();
    const visible = await addBtn.isVisible().catch(() => false);
    
    if (!visible) {
      console.log('⊘ No products available - skipping');
      test.skip();
      return;
    }
    
    await addBtn.click();
    await page.waitForTimeout(1000);
    
    // Checkout
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.fill('textarea[name="direccion_envio"]', 'Test Address 123');
    await page.selectOption('select[name="metodo_pago"]', 'efectivo');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    const url = page.url();
    const hasSuccess = await page.locator('text=Pedido Realizado').isVisible().catch(() => false);
    
    expect(hasSuccess || url.includes('/orders')).toBeTruthy();
    
    const cart = await page.evaluate(() => {
      const data = localStorage.getItem('prexcol_cart');
      return data ? JSON.parse(data) : [];
    });
    
    expect(cart.length).toBe(0);
    
    console.log('✅ TEST 3 PASSED');
  });

  test('Test 4: Error handling', async ({ page }) => {
    console.log('=== TEST 4: ERROR HANDLING ===');
    
    // Login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="login-email"]', { state: 'visible' });
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    await page.click('[data-testid="login-submit"]');
    await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle');
    
    // Add to cart
    await page.goto('/productos');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const addBtn = page.locator('button:has-text("Agregar")').first();
    const visible = await addBtn.isVisible().catch(() => false);
    
    if (!visible) {
      console.log('⊘ No products available - skipping');
      test.skip();
      return;
    }
    
    await addBtn.click();
    await page.waitForTimeout(1000);
    
    const cartBefore = await page.evaluate(() => {
      const data = localStorage.getItem('prexcol_cart');
      return data ? JSON.parse(data) : [];
    });
    
    // Try checkout without address
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
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

  test('Test 5: Auto-logout on 401', async ({ page }) => {
    console.log('=== TEST 5: AUTO-LOGOUT ===');
    
    // Login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="login-email"]', { state: 'visible' });
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    await page.click('[data-testid="login-submit"]');
    await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle');
    
    // Corrupt token
    await page.evaluate(() => {
      localStorage.setItem('token', 'invalid_xyz');
    });
    
    // Try protected route
    await page.goto('/orders');
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('/login');
    
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeFalsy();
    
    console.log('✅ TEST 5 PASSED');
  });

  test('Test 6: Order history display', async ({ page }) => {
    console.log('=== TEST 6: ORDER HISTORY ===');
    
    // Login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="login-email"]', { state: 'visible' });
    await page.fill('[data-testid="login-email"]', 'admin@prexcol.com');
    await page.fill('[data-testid="login-password"]', 'Prexcol123!');
    await page.click('[data-testid="login-submit"]');
    await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle');
    
    // Go to orders
    await page.goto('/orders');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const hasOrders = await page.locator('text=Pedido #').isVisible().catch(() => false);
    const hasEmpty = await page.locator('text=No tienes pedidos').isVisible().catch(() => false);
    
    expect(hasOrders || hasEmpty).toBeTruthy();
    
    console.log('✅ TEST 6 PASSED');
  });
});
