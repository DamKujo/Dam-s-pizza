import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib";
import { prisma } from "@/prisma/prisma-client";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }
    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: `desc`,
          },
          include: {
            variationProduct: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (e) {
    console.log("[CART_GET] Server error", e);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        variationProductId: data.variationItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
      include: {
        ingredients: true,
      },
    });

    const trueCartItem = findCartItem.find((item) => {
      const ingredientIds = item.ingredients.map((ingredient) => ingredient.id);
      return (
        ingredientIds.length === data.ingredients?.length &&
        ingredientIds.every((id) => data.ingredients?.includes(id))
      );
    });

    // если товар был найден, делаем + 1
    if (trueCartItem) {
      await prisma.cartItem.update({
        where: {
          id: trueCartItem.id,
        },
        data: {
          quantity: trueCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          variationProductId: data.variationItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set("cartToken", token);

    return resp;
  } catch (e) {
    console.log("[CART_POST] Server error", e);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}
