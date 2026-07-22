import { test } from "@playwright/test";

import { CatalogPage } from "../pages/CatalogPage";

test.describe("Catalog e2e", () => {
  test("пользователь открывает каталог и видит заголовок", async ({ page }) => {
    const catalog = new CatalogPage(page);
    await catalog.open();
    await catalog.expectLoaded();
  });
});
