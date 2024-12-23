import { Variation } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/choose-variants";

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: Variation[]
): Variant[] => {
  const filteredPizzaByType = items.filter((item) => item.pizzaType === type);
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzaByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};
