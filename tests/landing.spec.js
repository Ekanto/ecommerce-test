import {test, expect} from '@playwright/test';


test.describe('landing page e2e tests', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test('Check title', async ({page}) => {
    await expect(page).toHaveTitle('Acme Store');
  });
})



