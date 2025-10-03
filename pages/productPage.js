import { expect } from "allure-playwright";

class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productname = page.locator('h3:has-text("Acme Circles T-Shirt")');
    this.productPrice = page.locator('p:has-text("$20.00")');
    this.addToCartButtonWhenDisabled = page.locator(
      'button[aria-label="Please select an option"]'
    );
    this.addToCartButtonWhenEnabled = page.locator(
      'button[aria-label="Add to cart"]'
    );
    this.productImage = page
      .locator('img[alt="Acme Circles T-Shirt - t-shirt-1"]')
      .first();
    this.variantBlack = page.locator('button[title="Color Black"]');
    this.variantSize = page.locator('button[title="Size XS"]');
  }

  async verifyProductDetails() {
    console.log("Verifying product details");
    console.log("Clicking on product", await this.productname.textContent());
    await this.productname.click();
    console.log("Verifying price");
    await expect(this.productPrice).toBeVisible();
    console.log(
      "Product price verified",
      await this.productPrice.textContent()
    );
    console.log("Verifying Add to cart button and product image");
    await expect(this.addToCartButtonWhenDisabled).toBeVisible();
    console.log("Verifying Add to cart button is disabled by default");
    await expect(this.addToCartButtonWhenDisabled).toBeDisabled();
    await expect(this.productImage).toBeVisible();
    console.log(
      "Add to cart button is",
      await this.addToCartButtonWhenDisabled.textContent()
    );
    console.log(
      "Product image alt text is",
      await this.productImage.getAttribute("alt")
    );
  }

  async selectVariantAndAddToCart() {
    console.log("Selecting product variants");
    console.log(
      "Selecting the product first",
      await this.productname.textContent()
    );
    await this.productname.click();
    console.log("Check if we have color variant available");
    await expect(this.variantBlack).toBeVisible();
    console.log("Check if we have size variant available");
    await expect(this.variantSize).toBeVisible();
    console.log("Selecting color variant");
    await this.variantBlack.click();
    console.log("Selecting size variant");
    await this.variantSize.click();
    console.log("Verifying Add to cart button is enabled after selecting variants");
    await expect(this.addToCartButtonWhenEnabled).toBeEnabled();
    console.log("Clicking on Add to cart button");
    await this.addToCartButtonWhenEnabled.click();
    console.log("Add to cart button clicked, product should be added to cart now");
    
  }
}

export { ProductPage };
