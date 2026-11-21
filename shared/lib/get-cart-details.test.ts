import { describe, expect, it } from "vitest";
import { getCartDetails } from "./get-cart-details";
import { makeCart, makeCartItem } from "./test-fixtures/cart";

describe("getCartDetails", () => {
  it("кладёт в каждую позицию её итоговую цену с ингредиентами и количеством", () => {
    const cart = makeCart([
      makeCartItem({ id: 1, variationPrice: 499 }),
      makeCartItem({ id: 2, variationPrice: 499, ingredientPrices: [79, 59], quantity: 2 }),
    ]);

    const { items } = getCartDetails(cart);

    expect(items.map(({ id, price }) => ({ id, price }))).toEqual([
      { id: 1, price: 499 },
      { id: 2, price: 1274 },
    ]);
  });
});
