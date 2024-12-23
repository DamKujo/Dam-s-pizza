import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Container } from "./Container";
import { Categories } from "./Categories";
import { Sortpopup } from "./Sort-popup";
import { Category } from "@prisma/client";
import { categories } from "@/prisma/constants";

interface Props {
  className?: string;
  categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 ",
        className
      )}
    >
      <Container className="flex justify-between">
        <Categories items={categories} />
        <Sortpopup />
      </Container>
    </div>
  );
};
