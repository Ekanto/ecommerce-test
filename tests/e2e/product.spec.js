import {test, expect} from '@playwright/test';
import {ProductPage} from '../../pages/productPage';


test.describe('landing page e2e tests', () => {
  let productPage;

  test.beforeEach(async ({page}) => {
    await page.goto('/');
    productPage = new ProductPage(page);
  });

    test('Verify Product details are correct', async ({page}) => {
      await productPage.verifyProductDetails();
    });

    test('Should able to select product variants and add to cart', async ({page}) => {
        await productPage.selectVariantAndAddToCart()

    })

})



