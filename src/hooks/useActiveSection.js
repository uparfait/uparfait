import { useEffect, useState } from "react";

export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const last = els[els.length - 1];
    let middle = els[0].id;
    let atEnd = false;
    const update = () => setActive(atEnd ? last.id : middle);
    const band = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) middle = entry.target.id;
        });
        update();
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    const end = new IntersectionObserver(
      ([entry]) => {
        atEnd = entry.isIntersecting;
        update();
      },
      { threshold: 0.99 }
    );
    els.forEach((el) => band.observe(el));
    end.observe(last);
    return () => {
      band.disconnect();
      end.disconnect();
    };
  }, [ids]);
  return active;
}
