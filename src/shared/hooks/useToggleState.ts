import { useCallback, useState } from "react";

export const useToggleState = (initial?: boolean) => {
  const [state, setState] = useState(initial);

  const onToggle = useCallback(() => {
    setState((pr) => !pr);
  }, []);

  return [state, onToggle] as const;
};
