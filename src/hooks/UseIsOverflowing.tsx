import React, { useState } from "react";

export const useIsOverflowing = (
  ref: React.RefObject<any>,
  callback: (hasOverflow: boolean) => void,
) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean | undefined>(undefined);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;
      setIsOverflowing(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflowing;
};
