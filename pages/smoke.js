import { expect } from "allure-playwright";

class Smoke {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.shirts = page.locator('a:has-text("Shirts")');
  }

  async verifyNavigation() {
    console.log("Verifying navigation functionality");
    await this.page.goto("/");
    await expect(this.shirts).toBeVisible();
    await this.shirts.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/.*\/shirts/);
    console.log("Navigation verified successfully");
  }
}

export { Smoke };
