import { expect } from "allure-playwright";

class LandingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getSearchField = page.getByPlaceholder("Search for products...");
    this.productTitle = page.getByRole("heading", {
      name: "Acme Circles T-Shirt",
    });
    this.cartBtn = page.locator('button[aria-label="Open cart"]');
    this.cartDrawer = page.locator('p:has-text("My Cart")');
    this.cartCloseBtn = page.locator('button[aria-label="Close cart"]');
    this.termsAndConditionsLink = page.locator('a:has-text("Terms & Conditions")');
    this.shippingAndReturnsLink = page.locator('a:has-text("Shipping & Return Policy")');
    this.faqLink = page.locator('a:has-text("FAQ")');

  }

  async searchInput() {
    console.log("Verifying search functionality");
    await this.getSearchField.click();
    await this.getSearchField.fill("Acme Circles T-shirt");
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(10000);
    console.log("Search functionality verified");
  }

  async searchResultVerify() {
    await expect(this.productTitle).toBeVisible();
    const titleText = await this.productTitle.textContent();
    console.log("Searched product is: " + titleText);
    await expect(this.productTitle).toHaveText("Acme Circles T-Shirt");
    await this.page.waitForTimeout(10000);
    await this.page.screenshot({
      path: "test-results/screenshots/search-result.png",
      fullPage: true,
    });
  }

  async isSearchVisible() {
    await expect(this.getSearchField).toBeVisible();
  }

  async isSearchEnabled() {
    await expect(this.getSearchField).toBeEnabled();
  }

  async cartButtonActionVerify() {
    console.log("Cart button action verification started");
    await expect(this.cartBtn).toBeVisible();
    await expect(this.cartBtn).toBeEnabled();
    console.log("Cart button visibility and enabled state verified");
    await this.cartBtn.click();
    await this.page.waitForTimeout(5000);
    console.log("Cart button clicked and verifying cart drawer");
    await expect(this.cartDrawer).toBeVisible();
    console.log("Cart drawer is visible after clicking cart button");
    console.log("Closing the drawer");
    await expect(this.cartCloseBtn).toBeVisible();
    await this.cartCloseBtn.click();
    await this.page.waitForTimeout(5000);
    console.log("Cart drawer closed after clicking close button");
    await this.page.screenshot({
      path: "test-results/screenshots/cart-drawer.png",
      fullPage: true,
    });
  }

  async verifyFooterLinks() {
    console.log("Verifying footer links");
    await expect(this.termsAndConditionsLink).toBeVisible();
    await expect(this.shippingAndReturnsLink).toBeVisible();
    await expect(this.faqLink).toBeVisible();
    console.log("Footer links are visible. Checking their functionalities");
    await this.termsAndConditionsLink.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveTitle("Terms & Conditions | Acme Store");
    await this.page.goBack();
    await this.shippingAndReturnsLink.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveTitle("Shipping & Return Policy | Acme Store");
    await this.page.goBack();
    await this.faqLink.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveTitle("Frequently Asked Questions | Acme Store");
    await this.page.goBack();
    console.log("Footer links functionality verified");
  }
}

export { LandingPage };
