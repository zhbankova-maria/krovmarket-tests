import { describe, expect, it } from "vitest";

import { toRussianCostFormat } from "@/lib/utis/generalFuntions";

describe("toRussianCostFormat (unit)", () => {
  it("форматирует цену в русской локали", () => {
    expect(toRussianCostFormat(1000)).toBe("1\u00A0000");
    expect(toRussianCostFormat(19990)).toBe("19\u00A0990");
    expect(toRussianCostFormat(0)).toBe("0");
  });
});
