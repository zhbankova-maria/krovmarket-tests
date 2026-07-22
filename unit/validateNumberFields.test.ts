import { describe, expect, it } from "vitest";

import { validateNumberFields } from "@/lib/utis/validation/numberField";

describe("validateNumberFields (unit)", () => {
  it("принимает только целочисленные строки", () => {
    expect(validateNumberFields("12")).toBe(12);
    expect(validateNumberFields("0")).toBe(0);
    expect(validateNumberFields("12a")).toBe("");
    expect(validateNumberFields("")).toBe("");
    expect(validateNumberFields("3.5")).toBe("");
  });
});
