"use client";
import { cn } from "@/shared/lib/utils";
import { Container } from "./Container";
import React from "react";
import Image from "next/image";
import { Button } from "../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartBtn } from "./cart-btn";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  classname?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  classname,
}) => {
  const [openModal, setOpenModal] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage =
        "Заказ успешно оплачен! Информация отправлена на почту. ✅";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена! ✅";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn("border-b", classname)}>
      <Container className="flex items-center justify-between py-8">
        {/* {Left part} */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Dam's Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                Вкусней уже некуда!
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* {Right part} */}
        <div className="flex items-center gap-3">
          <AuthModal open={openModal} onClose={() => setOpenModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenModal(true)} />

          {hasCart && <CartBtn />}
        </div>
      </Container>
    </header>
  );
};
