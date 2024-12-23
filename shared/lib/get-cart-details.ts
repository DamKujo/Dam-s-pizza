import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemPrice } from "./calc-cart-item-price";

export type ICartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: ICartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.variationProduct.product.name,
    imageUrl: item.variationProduct.product.imageUrl,
    price: calcCartItemPrice(item),
    pizzaSize: item.variationProduct.size,
    pizzaType: item.variationProduct.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
