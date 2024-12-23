import * as React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Йоу, L'Appetito Vien Mangiando!</h1>

    <h3>Заказ #{orderId}</h3>
    <hr />

    <p>
      Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Перейдите
      <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
    </p>
  </div>
);
