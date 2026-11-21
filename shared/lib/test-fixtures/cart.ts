// Фабрики тестовых данных корзины для юнит-тестов.
import { CartDTO, CartItemDTO } from "../../services/dto/cart.dto";

const EPOCH = new Date(0);

const makeIngredient = (id: number, price: number) => ({
  id,
  name: `Ингредиент ${id}`,
  price,
  imageUrl: `/ingredient-${id}.png`,
  createdAt: EPOCH,
  updatedAt: EPOCH,
});

export const makeCartItem = ({
  id = 1,
  variationPrice,
  ingredientPrices = [],
  quantity = 1,
}: {
  id?: number;
  variationPrice: number;
  ingredientPrices?: number[];
  quantity?: number;
}): CartItemDTO => ({
  id,
  cartId: 1,
  variationProductId: 10,
  quantity,
  createdAt: EPOCH,
  updatedAt: EPOCH,
  variationProduct: {
    id: 10,
    price: variationPrice,
    size: 35,
    pizzaType: 1,
    productId: 100,
    product: {
      id: 100,
      name: "Пепперони",
      imageUrl: "/pepperoni.png",
      categoryId: 1,
      createdAt: EPOCH,
      updatedAt: EPOCH,
    },
  },
  ingredients: ingredientPrices.map((price, i) => makeIngredient(i + 1, price)),
});

export const makeCart = (items: CartItemDTO[], totalAmount = 0): CartDTO => ({
  id: 1,
  userId: null,
  token: "test-token",
  totalAmount,
  createdAt: EPOCH,
  updatedAt: EPOCH,
  items,
});
