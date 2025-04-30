import React from "react";
import { ClerkAPIError } from "@clerk/types";
import { Input, InputRef } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface InputPasswordProps {
  ref: React.RefObject<InputRef>;
  errors: ClerkAPIError[] | undefined;
  name?: string;
  className?: string;
}

function usePasswordError(errors: ClerkAPIError[] | undefined) {
  let isError = false;
  const errorMessages =
    errors?.filter(
      (e) =>
        e.code === "form_param_nil" ||
        e.meta?.paramName === "password" ||
        e.code === "form_password_pwned",
    ) ?? [];

  if (errorMessages.length) isError = true;

  return { isError, errorMessages };
}

export default function InputPassword({ errors, name, ref, className }: InputPasswordProps) {
  const { isError, errorMessages } = usePasswordError(errors);

  return (
    <div className={className}>
      <Input.Password
        placeholder="Password"
        autoComplete="current-password"
        name="password"
        prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        status={isError ? "error" : ""}
        ref={ref}
      />
      {isError &&
        errorMessages.map((m, i) => <span key={i} className="text-sm text-red-500">{m.longMessage}</span>)}
    </div>
  );
}
