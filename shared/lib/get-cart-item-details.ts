import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { ICartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: ICartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
