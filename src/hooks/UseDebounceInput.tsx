import React, { useEffect, useRef, useState } from "react";
import { InputRef } from "antd";

export default function useDebounceInput(
  inputRef: React.RefObject<InputRef | null>,
  debounceTime: number,
) {
  const [_refresh, _setRefresh] = useState(false);
  const debounceTimeout = useRef<number | null>(null);
  const [debouncedInput, setDebouncedInput] = useState<string>(
    inputRef.current?.input?.value || "",
  );

  const setRefresh = () => {
    _setRefresh(!_refresh);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const value = inputRef.current?.input?.value || "";
      setDebouncedInput(value);
    }, debounceTime);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [debounceTimeout, _refresh]);

  return { debouncedInput, setRefresh };
}
