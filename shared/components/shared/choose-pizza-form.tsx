"use client";
import React from "react";
import { Title } from "./title";
import { PizzaImage } from "./pizza-image";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";
import { ChooseVariants } from "./choose-variants";
import {
  type PizzaSize,
  pizzaTypes,
  type PizzaType,
} from "@/shared/constants/pizza";
import { Ingredient } from "@prisma/client";
import { IngredientOneItem } from "./ingredient-one-item";
import { type ProductWithRelations } from "@/@types/prisma";
import { getDetailsOfPizza } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductWithRelations["variations"];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  ingredients,
  name,
  onSubmit,
  className,
  items,
  loading,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getDetailsOfPizza(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) onSubmit(currentItemId, Array.from(selectedIngredients));
  };
  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1"></Title>

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <ChooseVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <ChooseVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientOneItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        {totalPrice === 0 ? (
          <Button
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
            onClick={handleClickAdd}
            disabled
          >
            Недоступно, такой пиццы нет :(
          </Button>
        ) : (
          <Button
            loading={loading}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
            onClick={handleClickAdd}
          >
            Добавить в корзину за {totalPrice} ₽
          </Button>
        )}
      </div>
    </div>
  );
};
