import React from "react";
import { ClerkAPIError } from "@clerk/types";

interface InputEmailProps {
  ref: React.RefObject<HTMLInputElement | null>,
  errors: ClerkAPIError[] | undefined,
  name?: string
}

export default function InputEmail({errors, ref, name}: InputEmailProps) {

  return <input placeholder="E-mail" name={name ? name : "email"} ref={ref}></input>
}