import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a value by a specified delay.
 * @param value The value to debounce (string, number, object, etc.)
 * @param delay The delay in milliseconds to wait after the last change
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
