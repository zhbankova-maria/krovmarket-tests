import { test } from "@playwright/test";

import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { HeaderPage } from "../pages/HeaderPage";

test.describe("Cart e2e", () => {
  test("пользователь переходит в корзину из шапки", async ({ page }) => {
    const home = new HomePage(page);
    const header = new HeaderPage(page);
    const cart = new CartPage(page);

    await home.open();
    await header.openCart();
    await cart.expectOpened();
  });
});
