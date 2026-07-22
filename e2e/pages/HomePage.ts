import { Page, Locator, expect } from "@playwright/test";

import { dismissOverlays } from "../helpers/overlays";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("Поиск");
    this.main = page.locator("main");
  }

  async open() {
    await this.page.goto("/");
    await dismissOverlays(this.page);
  }

  async expectLoaded() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.main).toBeVisible();
  }
}
