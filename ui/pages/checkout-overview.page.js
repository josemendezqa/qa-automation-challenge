const { expect } = require('@playwright/test');

class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async finishCheckout() {
    await expect(this.finishButton).toBeVisible();
    await this.finishButton.click();
  }

  async validateOrderSuccessMessage() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutOverviewPage };