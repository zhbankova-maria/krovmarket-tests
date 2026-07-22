import { test, expect } from "@playwright/test";

import { HomePage } from "../pages/HomePage";

test.describe("Home e2e", () => {
  test("главная страница открывается и показывает поиск", async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.expectLoaded();
    await expect(page).toHaveURL(/\/?$/);
  });
});
