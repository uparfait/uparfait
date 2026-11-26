import { useEffect, useRef } from "react";

export default function useHashSync(active, first) {
  const jumping = useRef(false);

  useEffect(() => {
    let timer = 0;
    const release = () => {
      jumping.current = false;
      clearTimeout(timer);
      window.removeEventListener("scrollend", release);
    };
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id && document.getElementById(id);
      if (!el) return;
      release();
      jumping.current = true;
      window.addEventListener("scrollend", release);
      timer = setTimeout(release, 1500);
      el.scrollIntoView();
    };
    go();
    window.addEventListener("hashchange", go);
    return () => {
      window.removeEventListener("hashchange", go);
      release();
    };
  }, []);

  useEffect(() => {
    if (jumping.current || !active) return;
    const current = window.location.hash.slice(1);
    if (current === active || (!current && active === first)) return;
    window.history.replaceState(window.history.state, "", `#${active}`);
  }, [active, first]);
}
