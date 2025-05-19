import React, { useRef, useState } from "react";
import { Input, InputRef } from "antd";

interface InputFriendcodeProps {
  disabled?: boolean;
  onCodeChange?: (code: string) => void;
}

export const InputFriendcode = ({ onCodeChange, disabled }: InputFriendcodeProps) => {
  const [friendCode1, setFriendCode1] = useState("");
  const [friendCode2, setFriendCode2] = useState("");
  const [friendCode3, setFriendCode3] = useState("");
  const [friendCode4, setFriendCode4] = useState("");

  const ref1 = useRef<InputRef>(null);
  const ref2 = useRef<InputRef>(null);
  const ref3 = useRef<InputRef>(null);
  const ref4 = useRef<InputRef>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    nextRef?: React.RefObject<InputRef | null>,
  ) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/\D/g, "").slice(0, 4); // solo numeri, max 4

    setValue(numericValue);

    if (numericValue.length === 4 && nextRef?.current) {
      nextRef?.current?.focus();
    }

    const code =
      (ref1.current?.input?.value || "") +
      (ref2.current?.input?.value || "") +
      (ref3.current?.input?.value || "") +
      (ref4.current?.input?.value || "");

    if (onCodeChange) onCodeChange(code);
  };

  return (
    <>
      <span className="friend-code-label">FriendCode</span>
      <div className="flex w-full justify-evenly">
        <Input
          disabled={disabled}
          className="max-w-[5em] p-3 text-center"
          placeholder="XXXX"
          value={friendCode1}
          onChange={(e) => handleChange(e, setFriendCode1, ref2)}
          ref={ref1}
          maxLength={4}
        />
        <span>-</span>
        <Input
          disabled={disabled}
          className="max-w-[5em] p-3 text-center"
          placeholder="XXXX"
          value={friendCode2}
          onChange={(e) => handleChange(e, setFriendCode2, ref3)}
          ref={ref2}
          maxLength={4}
        />
        <span>-</span>
        <Input
          disabled={disabled}
          className="max-w-[5em] p-3 text-center"
          placeholder="XXXX"
          value={friendCode3}
          onChange={(e) => handleChange(e, setFriendCode3, ref4)}
          ref={ref3}
          maxLength={4}
        />
        <span>-</span>
        <Input
          disabled={disabled}
          className="max-w-[5em] p-3 text-center"
          placeholder="XXXX"
          value={friendCode4}
          onChange={(e) => handleChange(e, setFriendCode4)}
          ref={ref4}
          maxLength={4}
        />
      </div>
    </>
  );
};
