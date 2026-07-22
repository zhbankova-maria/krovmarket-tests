import { describe, expect, it } from "vitest";

import { getReviewCountText } from "@/lib/utis/generalFuntions";

describe("getReviewCountText (unit)", () => {
  it("склоняет количество отзывов по правилам русского языка", () => {
    expect(getReviewCountText(1)).toBe("1 отзыв");
    expect(getReviewCountText(2)).toBe("2 отзыва");
    expect(getReviewCountText(5)).toBe("5 отзывов");
    expect(getReviewCountText(11)).toBe("11 отзывов");
    expect(getReviewCountText(21)).toBe("21 отзыв");
    expect(getReviewCountText(24)).toBe("24 отзыва");
  });
});
