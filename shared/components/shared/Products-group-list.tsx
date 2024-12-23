"use client";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Title } from "./title";
import { ProductCard } from "./Product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "../../store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  categoryId,
  items,
  title,
  className,
  listClassName,
}) => {
  const setActiveId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px] mb-10", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variations[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
