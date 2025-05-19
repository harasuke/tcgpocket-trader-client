import React, { useEffect, useRef, useState } from "react";

export default function useDebounceInput(
  value: string | null,
  debounceTime: number,
) {
  const [_refresh, _setRefresh] = useState(false);
  const debounceTimeout = useRef<number | null>(null);
  const [debouncedInput, setDebouncedInput] = useState<string>(
    value ?? "",
  );

  const setRefresh = () => {
    _setRefresh(!_refresh);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const val = value ?? "";
      setDebouncedInput(val);
    }, debounceTime);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [debounceTimeout, _refresh]);

  return { debouncedInput, setDebouncedInput, setRefresh };
}
