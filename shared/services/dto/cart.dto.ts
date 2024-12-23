import { Cart, CartItem, Ingredient, Product, Variation } from "@prisma/client";

export type CartItemDTO = CartItem & {
  variationProduct: Variation & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  variationItemId: number;
  ingredients?: number[];
}
