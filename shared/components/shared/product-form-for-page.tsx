"use client";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductFormForPage: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product.variations[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (variationItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = variationItemId ?? firstItem.id;

      await addCartItem({
        variationItemId: itemId,
        ingredients,
      });

      toast.success(product.name + " добавлен/-а/-о в корзину");

      _onSubmit?.();
    } catch (e) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(e);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.variations}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
