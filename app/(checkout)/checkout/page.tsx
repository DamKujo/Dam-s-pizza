"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/shared/hooks";
import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutPersonalData,
  CheckoutSideBar,
  Container,
  Title,
} from "@/shared/components";
import {
  CheckoutFormSchema,
  TCheckoutFormValues,
} from "@/shared/constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const [submitting, setSubmiting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const { data: session } = useSession();

  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      time: "",
      comment: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      console.log(data.fullName);
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: TCheckoutFormValues) => {
    try {
      setSubmiting(true);
      const url = await createOrder(data);
      toast.success("Заказ оформлен! 🍕 Переход на оплату...", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmiting(false);
      toast.error("Не удалось офомить заказ", {
        icon: "❌",
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ): void => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left part*/}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalData
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAddress
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            {/* Right part*/}
            <div className="w-[450px]">
              <CheckoutSideBar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
