import React from "react";
import { ClerkAPIError } from "@clerk/types";

interface InputPasswordProps {
  ref: React.RefObject<HTMLInputElement | null>,
  errors: ClerkAPIError[] | undefined,
  name?: string
}

export default function InputPassword({errors, name, ref}: InputPasswordProps) {

  return <input placeholder="Password" name={name ? name : "password"} ref={ref}></input>
}