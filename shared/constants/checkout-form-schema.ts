import { z } from "zod";

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])|Как можно скорее$/i;

export const CheckoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2-х символов" }),
  lastName: z
    .string()
    .min(2, { message: "Фамилия должна содержать не менее 2-х символов" }),
  email: z.string().email({ message: "Введите корректную почту" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
  address: z.string().min(5, { message: "Введите корректный адрес" }),
  time: z
    .string()
    .regex(timeRegex, { message: "Выберите время из предложенного списка" }),
  comment: z.string().optional(),
});

export type TCheckoutFormValues = z.infer<typeof CheckoutFormSchema>;
