import { Page, Locator, expect } from "@playwright/test";

import { dismissOverlays } from "../helpers/overlays";

export class CatalogPage {
  readonly page: Page;
  readonly title: Locator;
  readonly breadcrumbNav: Locator;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Каталог", level: 1 });
    this.breadcrumbNav = page.getByRole("navigation", { name: "Breadcrumb" });
    this.main = page.locator("main");
  }

  async open() {
    await this.page.goto("/katalog");
    await dismissOverlays(this.page);
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();
    await expect(this.breadcrumbNav).toBeVisible();
    await expect(this.main).toBeVisible();
  }
}
