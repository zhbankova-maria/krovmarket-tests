import { describe, expect, it } from "vitest";

import {
  addFavoriteToLS,
  addOrUpdateProductInCartAtLS,
  getAllProductsFromLS,
  getProductByIdFromLS,
  getTotalCartCountFromLS,
  removeProductFromLS,
} from "@/lib/utis/localStorageFunctions";

describe("cart & favorites localStorage (integration)", () => {
  it("добавляет товары в корзину и считает общее количество", () => {
    addOrUpdateProductInCartAtLS(10, 2);
    addOrUpdateProductInCartAtLS(11, 1);
    addOrUpdateProductInCartAtLS(10, 1);

    expect(getTotalCartCountFromLS()).toBe(4);
    expect(getProductByIdFromLS(10, "cart")).toEqual({
      product_id: 10,
      quantity: 3,
    });
  });

  it("перезаписывает quantity при setNewValue=true и удаляет позицию", () => {
    addOrUpdateProductInCartAtLS(20, 5);
    addOrUpdateProductInCartAtLS(20, 2, true);

    expect(getProductByIdFromLS(20, "cart")).toEqual({
      product_id: 20,
      quantity: 2,
    });

    removeProductFromLS(20, "cart");
    expect(getAllProductsFromLS("cart")).toEqual([]);
    expect(getTotalCartCountFromLS()).toBe(0);
  });

  it("добавляет товар в избранное без дублей", () => {
    addFavoriteToLS(100);
    addFavoriteToLS(100);
    addFavoriteToLS(101);

    expect(getAllProductsFromLS("favorites")).toEqual([
      { product_id: 100 },
      { product_id: 101 },
    ]);
  });
});
