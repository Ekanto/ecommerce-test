import { test, expect } from '@playwright/test';
import {Smoke} from '../../pages/smoke';



test.describe('Smoke Tests - Critical Path Validation', () => {

    let smoke;

  test('App is accessible and responsive', async ({ page }) => {
    console.log('Navigating to the homepage and checking server response');
    const response = await page.goto('/');
    expect(response.status()).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Homepage renders without critical errors', async ({ page }) => {
    console.log('Checking console for critical errors during page load');
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    const criticalErrors = errors.filter(err => 
      !err.includes('404') && !err.includes('favicon')
    );
    expect(criticalErrors.length).toBe(0);
    console.log('No critical console errors found');
  });

  test('Navigation is functional', async ({ page }) => {
    smoke = new Smoke(page);
    await smoke.verifyNavigation();
  });

   test('product listings are displayed', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const products = page.locator('a[href*="/product/"]');
    await expect(products.first()).toBeVisible();
  });

});