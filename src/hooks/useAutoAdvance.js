import { useEffect } from "react";

export default function useAutoAdvance(setIndex, length, delay = 10000) {
  useEffect(() => {
    const timer = setInterval(() => setIndex((v) => (v + 1) % length), delay);
    return () => clearInterval(timer);
  }, [setIndex, length, delay]);
}
