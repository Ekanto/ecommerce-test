import {test, expect} from '@playwright/test';
import {LandingPage} from '../pages/landingPage';


test.describe('landing page e2e tests', () => {
  let landingPage;

  test.beforeEach(async ({page}) => {
    await page.goto('/');
    landingPage = new LandingPage(page);
  });

  test('Check title', async ({page}) => {
    console.log('Verifying page title');
    await expect(page).toHaveTitle('Acme Store');
    console.log('Page title verified');
  });


  test('Verify I can Search for a product', async () => {
    
    await landingPage.searchInput();
  })

  test('Verify Search results are displayed', async ({page}) => {
    await landingPage.searchResultVerify();
  });

  test('Verify Cart button is visible, enabled and clickable', async ({page}) => {
    await landingPage.cartButtonActionVerify();
  });

  test('Verify Footer links are visible , clickable and functional', async ({page}) => {
    await landingPage.verifyFooterLinks();
  })

})



