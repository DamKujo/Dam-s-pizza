import { Ingredient, Variation } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-prices";

export const getDetailsOfPizza = (
  type: PizzaType,
  size: PizzaSize,
  items: Variation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  return { totalPrice, textDetails };
};
