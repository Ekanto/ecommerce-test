import {test, expect} from '@playwright/test';
import {Regression} from '../../pages/regression';


test.describe('landing page e2e tests', () => {
  let regression;

  test.beforeEach(async ({page}) => {
    await page.goto('/');
    regression = new Regression(page);
  });

    test('Verify switching collections works correctly', async ({page}) => {
      await regression.verifyCategorySwitching();
    });

    test('Verify price sorting', async () => {
    await regression.verifyPricesSortedHighToLow();
  });

    test('Verify price sorting - Low to High', async () => {
    await regression.verifyPricesSortedLowToHigh();
  });

})



