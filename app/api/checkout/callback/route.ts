import { PaymentCallbackData } from "@/@types/yookasa";
import { prisma } from "@/prisma/prisma-client";
import { OrderFailedTemplate, OrderSuccessTemplate } from "@/shared/components";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order is not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    console.log(items);

    if (isSucceeded) {
      await sendEmail(
        order.email,
        `Dam's Pizza | Ваш заказ успешно оформлен 🍕`,
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    } else {
      await sendEmail(
        order.email,
        `Dam's Pizza | Не удалось оформить ваш заказ 😢`,
        OrderFailedTemplate({ orderId: order.id })
      );
    }
  } catch (e) {
    console.log("[Checkout Callback] error", e);

    return NextResponse.json({ error: "Server error" });
  }
}
