import * as React from "react";

interface Props {
  orderId: number;
}

export const OrderFailedTemplate: React.FC<Props> = ({ orderId }) => (
  <div>
    <h1>
      <b>Qualcosa è andato storto</b>, или что-то пошло не так :(
    </h1>
    <hr />

    <p>
      Заказ #{orderId} не удалось оформить. Попробуйте снова или обратитесь в
      поддержку
    </p>

    <hr />

    <img
      src="https://avatars.mds.yandex.net/i?id=9ef795400a77fac9e7c04aee414368487b1b08c3-9386274-images-thumbs&n=13"
      alt="Грустный итальянец :("
    />
  </div>
);
