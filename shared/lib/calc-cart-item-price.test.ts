import { describe, expect, it } from "vitest";
import { calcCartItemPrice } from "./calc-cart-item-price";
import { makeCartItem } from "./test-fixtures/cart";

describe("calcCartItemPrice", () => {
  it("равна цене вариации, если нет доп. ингредиентов и количество 1", () => {
    expect(calcCartItemPrice(makeCartItem({ variationPrice: 499 }))).toBe(499);
  });

  it("добавляет цену каждого доп. ингредиента к цене вариации", () => {
    const item = makeCartItem({ variationPrice: 499, ingredientPrices: [79, 59] });
    expect(calcCartItemPrice(item)).toBe(637);
  });

  it("умножает цену на количество", () => {
    expect(calcCartItemPrice(makeCartItem({ variationPrice: 499, quantity: 3 }))).toBe(1497);
  });

  it("умножает на количество цену вместе с ингредиентами", () => {
    const item = makeCartItem({
      variationPrice: 499,
      ingredientPrices: [79, 59],
      quantity: 2,
    });
    expect(calcCartItemPrice(item)).toBe(1274);
  });

  describe("граничные случаи (фиксируют текущее поведение)", () => {
    it("возвращает 0 при количестве 0", () => {
      const item = makeCartItem({
        variationPrice: 499,
        ingredientPrices: [79],
        quantity: 0,
      });
      expect(calcCartItemPrice(item)).toBe(0);
    });

    it("бесплатный ингредиент не меняет цену", () => {
      const item = makeCartItem({ variationPrice: 499, ingredientPrices: [0] });
      expect(calcCartItemPrice(item)).toBe(499);
    });
  });
});
