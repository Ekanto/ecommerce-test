import {test, expect} from '@playwright/test';
import {LandingPage} from '../pages/landingPage';


test.describe('landing page e2e tests', () => {
  let landingPage;

  test.beforeEach(async ({page}) => {
    await page.goto('/');
    landingPage = new LandingPage(page);
  });

  test('Check title', async ({page}) => {
    await expect(page).toHaveTitle('Acme Store');
  });

  test('Verify Search is visible and enabled', async () => {
    await expect(landingPage.getSearchField).toBeVisible();
    await expect(landingPage.getSearchField).toBeEnabled();
  });

  test('Verify I can Search for a product', async () => {
    await landingPage.searchInput();
  })
})



