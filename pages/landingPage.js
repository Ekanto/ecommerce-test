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
    this.termsAndConditionsLink = page.locator(
      'a:has-text("Terms & Conditions")'
    );
    this.shippingAndReturnsLink = page.locator(
      'a:has-text("Shipping & Return Policy")'
    );
    this.faqLink = page.locator('a:has-text("FAQ")');
  }

  async searchInput(searchTerm = "Acme Circles T-shirt") {
    console.log(`Searching for: ${searchTerm}`);
    await this.getSearchField.click();
    await this.getSearchField.fill(searchTerm);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
    console.log("Search completed");
  }

  async searchResultVerify(expectedProduct = "Acme Circles T-Shirt") {
    console.log("Verifying search results");
    await expect(this.productTitle).toBeVisible();
    const titleText = await this.productTitle.textContent();
    console.log(`Search result found: ${titleText}`);
    await expect(this.productTitle).toHaveText(expectedProduct);
    await this.takeScreenshot("search-result");
  }

  async cartButtonActionVerify() {
    console.log("Verifying cart button actions");

    await expect(this.cartBtn).toBeVisible();
    await expect(this.cartBtn).toBeEnabled();
    console.log("Cart button is visible and enabled");

    await this.cartBtn.click();
    await expect(this.cartDrawer).toBeVisible();
    console.log("Cart drawer opened successfully");

    await expect(this.cartCloseBtn).toBeVisible();
    await this.cartCloseBtn.click();
    await expect(this.cartDrawer).not.toBeVisible();
    console.log("Cart drawer closed successfully");

    await this.takeScreenshot("cart-drawer");
  }

  async verifyFooterLink(linkLocator, expectedTitle, linkName) {
    console.log(`Verifying ${linkName} link`);
    await expect(linkLocator).toBeVisible();
    await linkLocator.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveTitle(expectedTitle);
    console.log(`${linkName} page loaded successfully`);
    await this.page.goBack();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyFooterLinks() {
    console.log("Verifying footer links");

    const footerLinks = [
      {
        locator: this.termsAndConditionsLink,
        title: "Terms & Conditions | Acme Store",
        name: "Terms & Conditions",
      },
      {
        locator: this.shippingAndReturnsLink,
        title: "Shipping & Return Policy | Acme Store",
        name: "Shipping & Returns",
      },
      {
        locator: this.faqLink,
        title: "Frequently Asked Questions | Acme Store",
        name: "FAQ",
      },
    ];

    for (const link of footerLinks) {
      await this.verifyFooterLink(link.locator, link.title, link.name);
    }

    console.log("All footer links verified successfully");
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
    console.log(`Screenshot saved: ${name}.png`);
  }

  async isSearchVisible() {
    await expect(this.getSearchField).toBeVisible();
  }

  async isSearchEnabled() {
    await expect(this.getSearchField).toBeEnabled();
  }
}

export { LandingPage };
