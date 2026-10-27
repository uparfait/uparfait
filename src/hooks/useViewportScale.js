import { useLayoutEffect } from "react";

export default function useViewportScale(min = 360, max = 1600) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const fit = () => {
      const width = window.innerWidth;
      const scale = String(width / Math.min(Math.max(width, min), max));
      root.style.zoom = scale;
      root.style.setProperty("--zoom", scale);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      root.style.zoom = "";
      root.style.removeProperty("--zoom");
    };
  }, [min, max]);
}
