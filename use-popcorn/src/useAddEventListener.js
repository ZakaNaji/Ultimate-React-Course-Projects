import { useEffect } from "react";

export function useAddEventListener(eventName, handler, element = document) {
  useEffect(() => {
    element.addEventListener(eventName, handler);
    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, element]);
}
