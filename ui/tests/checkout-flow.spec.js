const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { CheckoutPage } = require('../pages/checkout.page');
const { CheckoutOverviewPage } = require('../pages/checkout-overview.page');
const checkoutUser = require('../data/checkout-user');
const UI_USERNAME = process.env.UI_USERNAME || 'standard_user';
const UI_PASSWORD = process.env.UI_PASSWORD || 'secret_sauce';

test.describe('SauceDemo checkout flow', () => {
  test('should complete the checkout flow with two distinct items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    let selectedItems = [];

    await test.step('Login with standard_user', async () => {
      await loginPage.goto();
      await loginPage.login(UI_USERNAME, UI_PASSWORD);

      await expect(page).toHaveURL(/inventory/);

      await inventoryPage.waitForPage();
    });

    await test.step('Add exactly two distinct items dynamically', async () => {
      selectedItems = await inventoryPage.addFirstTwoItems();
      await inventoryPage.validateCartBadgeCount(2);
    });

    await test.step('Navigate to cart and validate items and quantity', async () => {
      await inventoryPage.goToCart();

      await expect(page).toHaveURL(/cart/);

      await cartPage.validateItems(selectedItems);
    });

    await test.step('Proceed to checkout and fill user information', async () => {
      await cartPage.proceedToCheckout();

      await expect(page).toHaveURL(/checkout-step-one/);

      await checkoutPage.fillUserInformation(checkoutUser);
      await checkoutPage.continue();

      await expect(page).toHaveURL(/checkout-step-two/);
    });

    await test.step('Complete transaction and verify success message', async () => {
      await checkoutOverviewPage.finishCheckout();

      await expect(page).toHaveURL(/checkout-complete/);

      await checkoutOverviewPage.validateOrderSuccessMessage();
    });
  });
});