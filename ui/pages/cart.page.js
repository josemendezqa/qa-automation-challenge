const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async validateItems(expectedItemNames) {
    await expect(this.cartItems).toHaveCount(expectedItemNames.length);

    for (let i = 0; i < expectedItemNames.length; i++) {
      const item = this.cartItems.nth(i);
      const itemName = item.locator('[data-test="inventory-item-name"]');
      const quantity = item.locator('[data-test="item-quantity"]');

      await expect(itemName).toHaveText(expectedItemNames[i]);
      await expect(quantity).toHaveText('1');
    }
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };