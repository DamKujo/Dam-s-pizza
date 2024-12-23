import { axiosInctance } from "./instance";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInctance.get<CartDTO>("/cart");

  return data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartDTO> => {
  return (await axiosInctance.patch<CartDTO>("/cart/" + itemId, { quantity }))
    .data;
};

export const deleteCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInctance.delete<CartDTO>("/cart/" + id)).data;
};

export const addCartItem = async (
  values: CreateCartItemValues
): Promise<CartDTO> => {
  return (await axiosInctance.post<CartDTO>("/cart", values)).data;
};
