"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";

export interface Variant {
  name: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  className?: string;
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  value?: Variant["value"];
}

export const ChooseVariants: React.FC<Props> = ({
  items,
  className,
  onClick,
  value,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#F3F2F7] rounded-3xl p-1 select-none -webkit-user-select",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === value,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
