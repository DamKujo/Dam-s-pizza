import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput, Title } from "@/shared/components";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";

interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Вы успешно зарегистрировали аккаунт", {
        icon: "✅",
      });

      onClose?.();
    } catch (e) {
      console.error("Error REGISTER", e);
      toast.error("Не удалось зарегистрировать аккаунт", {
        icon: "❌",
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title
              text="Регистрация аккаунта"
              size="md"
              className="font-bold"
            />
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>
        <p className="text-gray-400">Введите свою почту</p>
        <FormInput name="email" label="E-Mail" required />
        <p className="text-gray-400">Введите свое имя и фамилию</p>
        <FormInput name="fullName" label="FullName" required />
        <p className="text-gray-400">Введите пароль</p>
        <FormInput name="password" label="Пароль" type="password" required />
        <p className="text-gray-400">Повторите пароль</p>
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
