import { describe, expect, it, vi } from "vitest";

import { getFilteredProducts } from "@/lib/api/products";

describe("getFilteredProducts (integration)", () => {
  it("собирает query-параметры и ходит в /api/products/", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 1,
        next: null,
        previous: null,
        results: [{ id: 1, name: "Товар" }],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const data = await getFilteredProducts({
      category: "krovlya",
      cityDomain: "moskva.krov.market",
      page: 1,
      price_gte: 1000,
      price_lte: 50000,
      order_by: "price",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];

    expect(url).toContain("/api/products/?");
    expect(url).toContain("category=krovlya");
    expect(url).toContain("city_domain=moskva.krov.market");
    expect(url).toContain("page=1");
    expect(url).toContain("price_gte=1000");
    expect(url).toContain("price_lte=50000");
    expect(url).toContain("order_by=price");
    expect(options).toMatchObject({ cache: "no-store" });
    expect(data.count).toBe(1);
  });

  it("бросает ошибку, если backend ответил не ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    await expect(
      getFilteredProducts({ search: "черепица" })
    ).rejects.toThrow("HTTP error! status: 500");
  });
});
