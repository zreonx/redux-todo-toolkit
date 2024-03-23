import { useEffect, useRef } from "react";

const useFocus = () => {
  const refName = useRef(null);

  useEffect(() => {
    if (refName.current) {
      refName.current.focus();
    }
  }, [refName]);

  return refName;
};

export { useFocus };
