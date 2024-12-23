import React, { useMemo } from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { getDeliveryPrice } from "@/shared/lib/get-delivery-price";
import { useFormContext } from "react-hook-form";

interface Props {
  totalAmount: number;
  loading: boolean;
  className?: string;
  address?: string;
}

const VAT = 10;

export const CheckoutSideBar: React.FC<Props> = ({
  loading,
  totalAmount,
  className,
}) => {
  const { watch } = useFormContext();
  const address = watch("address");

  let DELIVERY_PRICE: number = useMemo(
    () => getDeliveryPrice(address),
    [address]
  );

  const vatPrice: number = (totalAmount * VAT) / 100;

  const totalPrice: number = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итог:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={20} className="mr-2 text-gray-300" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={20} className="mr-2 text-gray-300" />
            НДС:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${vatPrice} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={20} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={`${DELIVERY_PRICE ? DELIVERY_PRICE : "-"} ₽`}
      />

      <Button
        disabled={loading}
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
