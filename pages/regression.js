import { expect } from "allure-playwright";

class Regression {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.allProducts = page.locator('a:has-text("All")');
    this.bagsCategory = page.locator('a:has-text("Bags")');
    this.bagsProduct = page.locator('h3:has-text("Acme Drawstring Bag")');
    this.kidscategory = page.locator('a:has-text("Kids")');
    this.kidsProduct = page.locator('h3:has-text("Acme Baby Cap")');
    this.priceHighToLowOption = page.locator('a:has-text("Price: High to low")');
    this.priceLowToHighOption = page.locator('a:has-text("Price: Low to high")');
    this.productPrices = page.locator('p.text-white');
  }

  async verifyCategory(
    categoryName,
    categoryLocator,
    productLocator,
    expectedProductName
  ) {
    console.log(`Clicking on ${categoryName} category`);
    await categoryLocator.click();
    await this.page.waitForLoadState("networkidle");

    console.log(`Verifying ${categoryName} product is visible`);
    await expect(productLocator).toBeVisible();
    await expect(productLocator).toHaveText(expectedProductName);
    console.log(`${categoryName} product "${expectedProductName}" is visible`);
  }

  async verifyCategorySwitching() {
    console.log("Verifying category switching");

    await this.allProducts.click();

    await this.verifyCategory(
      "Bags",
      this.bagsCategory,
      this.bagsProduct,
      "Acme Drawstring Bag"
    );

    await this.verifyCategory(
      "Kids",
      this.kidscategory,
      this.kidsProduct,
      "Acme Baby Cap"
    );

    console.log("Category switching verified successfully");
  }


  extractPrice(priceText) {
    return parseFloat(priceText.replace(/[$,USD\s]/g, ''));
  }


  async getAllPrices() {
    const priceElements = await this.productPrices.all();
    const prices = [];
    
    for (const priceElement of priceElements) {
      const priceText = await priceElement.textContent();
      const price = this.extractPrice(priceText);
      prices.push(price);
    }
    
    console.log('Extracted prices:', prices);
    return prices;
  }


  async takeScreenshotOnFailure(screenshotName) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const path = `test-results/screenshots/${screenshotName}-${timestamp}.png`;
    await this.page.screenshot({
      path: path,
      fullPage: true,
    });
    console.log(`Screenshot saved: ${path}`);
  }

  async verifyPricesSortedHighToLow() {
    console.log('Verifying prices are sorted from high to low');
    await this.allProducts.click();
    
    console.log('Clicking on "Price: High to low" sort option');
    await this.priceHighToLowOption.click();
    await this.page.waitForLoadState('networkidle');
    
    const prices = await this.getAllPrices();
    
    const sortedPrices = [...prices].sort((a, b) => b - a);
    
    console.log('Actual prices:', prices);
    console.log('Expected sorted prices (high to low):', sortedPrices);
    
    try {
      expect(prices).toEqual(sortedPrices);
      console.log('Prices are correctly sorted from high to low');
      
      if (prices.length > 0) {
        expect(prices[0]).toBeGreaterThanOrEqual(prices[prices.length - 1]);
        console.log(`Highest price: $${prices[0]}, Lowest price: $${prices[prices.length - 1]}`);
      }
    } catch (error) {
      console.error('❌ Sorting verification failed!');
      console.error('Expected (sorted):', sortedPrices);
      console.error('Actual (from page):', prices);
      
      await this.takeScreenshotOnFailure('price-sorting-high-to-low-failed');
      
      throw error;
    }
  }

 
  async verifyPricesSortedLowToHigh() {
    console.log('Verifying prices are sorted from low to high');
    console.log('Clicking on "All" category to view all products');
    await this.allProducts.click();
    await this.priceLowToHighOption.click();
    await this.page.waitForLoadState('networkidle')
    
    const prices = await this.getAllPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    console.log('Actual prices:', prices);
    console.log('Expected sorted prices (low to high):', sortedPrices);
    
    try {
      expect(prices).toEqual(sortedPrices);
      console.log('Prices are correctly sorted from low to high');
    } catch (error) {
      console.error('❌ Sorting verification failed!');
      console.error('Expected (sorted):', sortedPrices);
      console.error('Actual (from page):', prices);
      
      await this.takeScreenshotOnFailure('price-sorting-low-to-high-failed');
      
      throw error;
    }
  }
}

export { Regression };