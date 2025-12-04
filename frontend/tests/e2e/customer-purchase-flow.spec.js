// tests/e2e/customer-purchase-flow.spec.js
import { test, expect } from '@playwright/test';

/**
 * Test E2E: Flujo Completo de Compra del Cliente
 * 
 * Este test simula el journey crítico de un cliente:
 * 1. Login
 * 2. Selección de tienda
 * 3. Navegación por catálogo
 * 4. Agregar productos al carrito
 * 5. Checkout y creación de pedido
 */

test.describe('Flujo de Compra del Cliente', () => {
  const BASE_URL = process.env.VITE_APP_URL || 'http://localhost:5173';
  const API_URL = process.env.VITE_API_URL || 'http://localhost:8000';
  
  // Credenciales de prueba
  const testUser = {
    email: 'cliente@test.com',
    password: 'Password123!'
  };

  test.beforeEach(async ({ page }) => {
    // Navegar a la página de inicio
    await page.goto(BASE_URL);
  });

  test('Cliente puede completar una compra exitosamente', async ({ page }) => {
    // ========== PASO 1: LOGIN ==========
    await test.step('Login del cliente', async () => {
      await page.click('text=Iniciar Sesión');
      await page.fill('input[type="email"]', testUser.email);
      await page.fill('input[type="password"]', testUser.password);
      await page.click('button[type="submit"]');
      
      // Verificar redirección al dashboard del cliente
      await expect(page).toHaveURL(/.*cliente/);
      await expect(page.locator('text=Panel de Cliente')).toBeVisible();
    });

    // ========== PASO 2: SELECCIÓN DE TIENDA ==========
    await test.step('Seleccionar tienda', async () => {
      // Esperar a que carguen las tiendas
      await page.waitForSelector('select[name="tienda"]', { timeout: 5000 });
      
      // Seleccionar la primera tienda disponible
      await page.selectOption('select[name="tienda"]', { index: 1 });
      
      // Verificar que se cargaron productos
      await expect(page.locator('.producto-card')).toHaveCount({ min: 1 });
    });

    // ========== PASO 3: NAVEGACIÓN Y FILTRADO ==========
    await test.step('Filtrar productos básicos', async () => {
      // Aplicar filtro de productos básicos
      await page.click('button:has-text("Básicos")');
      
      // Verificar que solo se muestran productos básicos
      const productosBasicos = page.locator('.producto-card[data-basico="true"]');
      await expect(productosBasicos).toHaveCount({ min: 1 });
    });

    // ========== PASO 4: AGREGAR AL CARRITO ==========
    await test.step('Agregar productos al carrito', async () => {
      // Agregar primer producto
      const primerProducto = page.locator('.producto-card').first();
      await primerProducto.locator('button:has-text("Agregar")').click();
      
      // Verificar que el carrito se actualizó
      await expect(page.locator('.carrito-count')).toContainText('1');
      
      // Agregar segundo producto
      const segundoProducto = page.locator('.producto-card').nth(1);
      await segundoProducto.locator('button:has-text("Agregar")').click();
      
      await expect(page.locator('.carrito-count')).toContainText('2');
    });

    // ========== PASO 5: MODIFICAR CANTIDADES ==========
    await test.step('Modificar cantidades en el carrito', async () => {
      // Incrementar cantidad del primer item
      const primerItem = page.locator('.carrito-item').first();
      await primerItem.locator('button[aria-label="Incrementar"]').click();
      
      // Verificar que la cantidad aumentó
      await expect(primerItem.locator('.cantidad')).toContainText('2');
      
      // Verificar que el total se actualizó
      const totalAntes = await page.locator('.total-carrito').textContent();
      expect(parseFloat(totalAntes.replace(/[^0-9.]/g, ''))).toBeGreaterThan(0);
    });

    // ========== PASO 6: SELECCIONAR MÉTODO DE PAGO ==========
    await test.step('Seleccionar método de pago', async () => {
      await page.selectOption('select[name="metodoPago"]', 'efectivo');
      
      // Verificar que el botón de crear pedido está habilitado
      const btnCrearPedido = page.locator('button:has-text("Crear Pedido")');
      await expect(btnCrearPedido).toBeEnabled();
    });

    // ========== PASO 7: CREAR PEDIDO ==========
    await test.step('Crear pedido', async () => {
      // Interceptar la llamada a la API
      await page.route(`${API_URL}/api/productos/pedidos/`, async route => {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 123,
            estado: 'pendiente',
            total: 50000,
            fecha_creacion: new Date().toISOString()
          })
        });
      });

      await page.click('button:has-text("Crear Pedido")');
      
      // Verificar mensaje de éxito
      await expect(page.locator('.alert-success')).toContainText('Pedido creado exitosamente');
      
      // Verificar que el carrito se vació
      await expect(page.locator('.carrito-count')).toContainText('0');
    });

    // ========== PASO 8: VERIFICAR HISTORIAL ==========
    await test.step('Verificar pedido en historial', async () => {
      // Navegar a la sección de pedidos anteriores
      await page.click('text=Mis Pedidos');
      
      // Verificar que el nuevo pedido aparece
      const ultimoPedido = page.locator('.pedido-card').first();
      await expect(ultimoPedido).toContainText('Pedido #123');
      await expect(ultimoPedido).toContainText('pendiente');
    });
  });

  test('Validación de stock al agregar productos', async ({ page }) => {
    await test.step('Login', async () => {
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="email"]', testUser.email);
      await page.fill('input[type="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await expect(page).toHaveURL(/.*cliente/);
    });

    await test.step('Intentar agregar más del stock disponible', async () => {
      // Seleccionar tienda
      await page.selectOption('select[name="tienda"]', { index: 1 });
      
      // Encontrar un producto con stock limitado
      const producto = page.locator('.producto-card').first();
      const stockText = await producto.locator('.stock').textContent();
      const stockDisponible = parseInt(stockText.match(/\d+/)[0]);
      
      // Agregar al carrito
      await producto.locator('button:has-text("Agregar")').click();
      
      // Intentar incrementar más allá del stock
      const itemCarrito = page.locator('.carrito-item').first();
      for (let i = 0; i < stockDisponible + 5; i++) {
        await itemCarrito.locator('button[aria-label="Incrementar"]').click();
      }
      
      // Verificar que no se puede exceder el stock
      const cantidadFinal = await itemCarrito.locator('.cantidad').textContent();
      expect(parseInt(cantidadFinal)).toBeLessThanOrEqual(stockDisponible);
      
      // Verificar mensaje de advertencia
      await expect(page.locator('.alert-warning')).toContainText('stock disponible');
    });
  });

  test('Manejo de errores en la creación de pedido', async ({ page }) => {
    await test.step('Login', async () => {
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="email"]', testUser.email);
      await page.fill('input[type="password"]', testUser.password);
      await page.click('button[type="submit"]');
    });

    await test.step('Simular error de red', async () => {
      // Seleccionar tienda y agregar producto
      await page.selectOption('select[name="tienda"]', { index: 1 });
      await page.locator('.producto-card').first().locator('button:has-text("Agregar")').click();
      await page.selectOption('select[name="metodoPago"]', 'efectivo');
      
      // Interceptar y simular error
      await page.route(`${API_URL}/api/productos/pedidos/`, async route => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ detail: 'Error del servidor' })
        });
      });

      await page.click('button:has-text("Crear Pedido")');
      
      // Verificar mensaje de error
      await expect(page.locator('.alert-error')).toBeVisible();
      await expect(page.locator('.alert-error')).toContainText('Error');
      
      // Verificar que el carrito no se vació
      await expect(page.locator('.carrito-count')).not.toContainText('0');
    });
  });
});
