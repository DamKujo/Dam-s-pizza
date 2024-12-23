import * as React from "react";

interface Props {
  code: string;
}

export const VerificateCodeUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Код подтверждения: <b>{code}</b>
    </p>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Подтвердите регистрацию
      </a>
    </p>
  </div>
);
