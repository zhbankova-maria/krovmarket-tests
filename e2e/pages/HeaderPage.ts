import { Page, Locator, expect } from "@playwright/test";

import { dismissOverlays } from "../helpers/overlays";

export class HeaderPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly catalogButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("Поиск");
    this.catalogButton = page.getByRole("link", { name: /Каталог/i }).first();
    this.cartLink = page.locator('a[href="/korzina"]').first();
  }

  async prepare() {
    await dismissOverlays(this.page);
  }

  async openCatalog() {
    await this.prepare();
    await this.page.goto("/katalog");
    await dismissOverlays(this.page);
  }

  async openCart() {
    await this.prepare();
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/korzina/);
  }

  async typeSearch(query: string) {
    await this.prepare();
    await this.searchInput.fill(query);
  }
}
