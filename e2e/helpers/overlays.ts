import { Page, expect } from "@playwright/test";

/**
 * Закрывает типичные оверлеи магазина, мешающие e2e.
 */
export async function dismissOverlays(page: Page) {
  const cookieButton = page.getByRole("button", { name: "Отлично" });
  if (await cookieButton.isVisible().catch(() => false)) {
    await cookieButton.click();
  }

  const confirmCity = page.getByRole("button", { name: "Да" });
  if (await confirmCity.isVisible().catch(() => false)) {
    await confirmCity.click();
  }
}

export async function expectPageReady(page: Page) {
  await expect(page.locator("body")).toBeVisible();
}
