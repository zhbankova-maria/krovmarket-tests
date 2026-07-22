import { describe, expect, it } from "vitest";

import { getBreadcrumbByNames } from "@/lib/utis/generalFuntions";

describe("getBreadcrumbByNames (unit)", () => {
  it("строит хлебные крошки каталога из пар [title, slug]", () => {
    expect(getBreadcrumbByNames([])).toEqual([]);

    expect(
      getBreadcrumbByNames([
        ["Кровля", "krovlya"],
        ["Металлочерепица", "metallocherepica"],
      ])
    ).toEqual([
      { title: "Кровля", href: "/katalog/krovlya" },
      { title: "Металлочерепица", href: "/katalog/metallocherepica" },
    ]);
  });
});
