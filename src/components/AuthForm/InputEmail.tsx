import React, { useEffect, useState } from "react";
import { ClerkAPIError } from "@clerk/types";
import { Input, InputRef } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface InputEmailProps {
  ref: React.RefObject<InputRef>;
  errors: ClerkAPIError[] | undefined;
  name?: string;
  className?: string;
}

function useEmailError(errors: ClerkAPIError[] | undefined, ref: React.RefObject<InputRef>) {
  let isError = false;

  const errorMessages =
    errors?.filter(
      (e) =>
        e.meta?.paramName === "identifier" ||
        e.meta?.paramName === "email_address" ||
        e.code === "form_identifier_exists",
    ) ?? [];
  if (errorMessages.length) isError = true;

  return { isError, errorMessages };
}

export default function InputEmail({ errors, ref, name, className }: InputEmailProps) {
  const { isError, errorMessages } = useEmailError(errors, ref);

  return (
    <div className={className}>
      <Input
        placeholder="E-mail"
        autoComplete="username"
        className="w-full"
        prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        status={isError ? "error" : ""}
        name={name ? name : "email"}
        ref={ref}
      />
      {isError &&
        errorMessages.map((m, i) => <span key={i} className="text-sm text-red-500">{m.longMessage}</span>)}
    </div>
  );
}
