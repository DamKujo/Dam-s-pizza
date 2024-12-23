import { cn } from "@/shared/lib/utils";
import React from "react";
interface Props {
  size: 25 | 35 | 45;
  imageUrl?: string;
  className?: string;
}

export const PizzaImage: React.FC<Props> = ({ size, imageUrl, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className
      )}
    >
      <img
        src={imageUrl}
        alt="logo"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "w-[300px] h-[300px]": size === 25,
            "w-[400px] h-[400px]": size === 35,
            "w-[500px] h-[500px]": size === 45,
          }
        )}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};