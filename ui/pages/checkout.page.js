const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async fillUserInformation(user) {
    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.postalCodeInput.fill(user.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }
}

module.exports = { CheckoutPage };