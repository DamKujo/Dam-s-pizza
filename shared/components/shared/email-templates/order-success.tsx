import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import * as React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>
      <b>Grazie per aver comprato</b>, то есть, спасибо за покупку! 🍕
    </h1>

    <p>Ваш заказ #{orderId} оплачен. Список продуктов:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.variationProduct.product.name} | {item.variationProduct.price} ₽
          X {item.quantity} шт. = {item.variationProduct.price * item.quantity}{" "}
          ₽
        </li>
      ))}
    </ul>
    <hr />

    <img
      src="https://cdn1.flamp.ru/4a5f64625da4fc1fbf23b696cda28586.jpg"
      alt="Добрый итальянец с пиццей :)"
    />
  </div>
);
