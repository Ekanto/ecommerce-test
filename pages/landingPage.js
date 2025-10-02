class LandingPage {
  constructor(page) {
    this.page = page;
    this.getSearchField = page.getByPlaceholder("Search for products...");
  }

  async searchInput() {
    await this.getSearchField.click();
    await this.getSearchField.fill("Acme Circles T-shirt");
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async isSearchVisible() {
    await expect(this.getSearchField).toBeVisible();
  }

  async isSearchEnabled() {
    await expect(this.getSearchField).toBeEnabled();
  }
}

export { LandingPage };
