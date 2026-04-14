const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async waitForPage() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async addFirstTwoItems() {
    const itemCount = await this.inventoryItems.count();

    if (itemCount < 2) {
      throw new Error('Expected at least 2 inventory items, but found fewer.');
    }

    const selectedItems = [];

    for (let i = 0; i < 2; i++) {
      const item = this.inventoryItems.nth(i);
      const itemName = await item.locator('[data-test="inventory-item-name"]').textContent();
      const addToCartButton = item.locator('button');

      await addToCartButton.click();

      selectedItems.push(itemName.trim());
    }

    return selectedItems;
  }

  async validateCartBadgeCount(expectedCount) {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };