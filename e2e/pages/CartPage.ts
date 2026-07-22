import { Page, Locator, expect } from "@playwright/test";

import { dismissOverlays } from "../helpers/overlays";

export class CartPage {
  readonly page: Page;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.locator("main").or(page.locator("body"));
  }

  async open() {
    await this.page.goto("/korzina");
    await dismissOverlays(this.page);
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/korzina/);
    await expect(this.page.locator("body")).toBeVisible();
  }
}
