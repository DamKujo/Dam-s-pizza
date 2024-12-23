import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ message: "Code not found" }, { status: 400 });
    }

    const verifycationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verifycationCode) {
      return NextResponse.json(
        { message: "Code is not correct" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        id: verifycationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verifycationCode.id,
      },
    });

    return NextResponse.redirect(new URL("/?verified", req.url));
  } catch (e) {
    console.error("VERIFY ERROR", e);
    return NextResponse.json(
      { message: "Не удалось выполнить верификацию" },
      { status: 500 }
    );
  }
}
