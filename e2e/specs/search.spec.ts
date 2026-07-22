import { test, expect } from "@playwright/test";

import { HeaderPage } from "../pages/HeaderPage";
import { HomePage } from "../pages/HomePage";

test.describe("Search e2e", () => {
  test("пользователь вводит запрос в поле поиска", async ({ page }) => {
    const home = new HomePage(page);
    const header = new HeaderPage(page);

    await home.open();
    await header.typeSearch("черепица");

    await expect(header.searchInput).toHaveValue("черепица");
  });
});
