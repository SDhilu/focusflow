import { useState } from "react";

// Read the saved value once when the component first loads.
// If nothing has been saved yet, use the starter data instead.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.warn(`Could not read ${key} from LocalStorage:`, error);
      return initialValue;
    }
  });

  // Update React state and LocalStorage together.
  const updateValue = (nextValue) => {
    setValue((currentValue) => {
      const resolvedValue =
        typeof nextValue === "function" ? nextValue(currentValue) : nextValue;

      try {
        window.localStorage.setItem(key, JSON.stringify(resolvedValue));
      } catch (error) {
        console.warn(`Could not save ${key} to LocalStorage:`, error);
      }

      return resolvedValue;
    });
  };

  return [value, updateValue];
}