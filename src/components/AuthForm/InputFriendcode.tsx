import React, { useEffect, useRef, useState } from "react";
import { Input, InputRef } from "antd";

const useInputArray = (length: number) => {
  return Array.from({ length }).map(() => {
    const ref = useRef<InputRef>(null);
    const [value, setValue] = useState("");
    return { ref, value, setValue };
  });
};

interface InputFriendcodeProps {
  disabled?: boolean;
  onCodeChange?: (code: string) => void;
}

export const InputFriendcode = ({ onCodeChange, disabled }: InputFriendcodeProps) => {
  const inputs = useInputArray(4);

  useEffect(() => {
    const code = inputs?.reduce((acc, i) => (acc += i.value), "");
    if (onCodeChange) onCodeChange(code);
  }, [inputs]);

  function onPastedFriendCode(pastedValue: string) {
    const chunks = pastedValue.replace(/\D/g, "").match(/.{1,4}/g);
    if (!chunks || !chunks?.length) return;

    inputs.forEach((input, index) => {
      if (!chunks[index]) return;
      if (!input.ref.current?.input) return;

      if (chunks[index]) {
        input.setValue(chunks[index]);
      }
    });
  }

  return (
    <>
      <span className="friend-code-label">FriendCode</span>
      <div className="flex w-full justify-evenly">
        {inputs.map((input, index) => {
          return (
            <>
              <FriendCodeChunk
                key={index}
                ref={input.ref}
                value={input.value}
                setValue={input.setValue}
                disabled={disabled}
                onPaste={onPastedFriendCode}
                onReachLastChar={() => inputs[index + 1]?.ref?.current?.input?.focus()}
              />
              {index !== inputs.length - 1 && <span key={"_" + index}>-</span>}
            </>
          );
        })}
      </div>
    </>
  );
};

interface FriendCodeChunkProps {
  ref: React.RefObject<InputRef | null>;
  disabled?: boolean;
  onPaste: (value: string) => void;
  onReachLastChar?: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const FriendCodeChunk = ({
  ref,
  disabled,
  onPaste,
  onReachLastChar,
  value,
  setValue,
}: FriendCodeChunkProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/\D/g, "").slice(0, 4); // only numbers, up to 4.

    setValue(numericValue);

    if (numericValue.length == 4 && onReachLastChar) onReachLastChar();
  };

  return (
    <Input
      ref={ref}
      value={value}
      disabled={disabled ?? false}
      maxLength={4}
      className="max-w-[5em] p-3 text-center"
      placeholder="XXXX"
      onChange={(e) => handleChange(e)}
      onPaste={(e) => onPaste(e.clipboardData.getData("text"))}
    />
  );
};
