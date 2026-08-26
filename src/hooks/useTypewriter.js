import { useEffect, useState } from "react";

export default function useTypewriter(texts, speed = 25, pause = 1250) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = texts[index % texts.length];
    if (!deleting && length === full.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && length === 0) return void (setDeleting(false), setIndex((v) => v + 1));
    const t = setTimeout(() => setLength((v) => v + (deleting ? -1 : 1)), deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [length, deleting, index, texts, speed, pause]);
  return texts[index % texts.length].slice(0, length);
}
