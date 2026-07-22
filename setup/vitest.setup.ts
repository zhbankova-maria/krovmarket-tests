import { afterEach, beforeEach, vi } from "vitest";

process.env.NEXT_PUBLIC_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://dev-api-shop.altawest.ru";

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.unstubAllGlobals();
});
