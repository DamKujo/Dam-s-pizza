import { Button, Dialog } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm, RegisterForm } from "./forms";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleclose = () => {
    onClose();
  };
  return (
    <Dialog.Dialog open={open} onOpenChange={handleclose}>
      <Dialog.DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? (
          <LoginForm onClose={handleclose} />
        ) : (
          <RegisterForm onClose={handleclose} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHub
          </Button>

          <Button
            variant="ghost"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
            disabled
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google <br />
            (Ведутся работы)
          </Button>
        </div>

        <Button
          variant={"outline"}
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type !== "login" ? "Войти" : "Регистрация"}
        </Button>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};