import React from "react";
import { useCartStore } from "../store/cart";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { ICartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  items: ICartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
