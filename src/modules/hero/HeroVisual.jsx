import { useState } from "react";
import { hero } from "../../content/hero";

const portrait = `${import.meta.env.BASE_URL}favicon.ico?v=${__FAVICON_VERSION__}`;

export default function HeroVisual() {
  const [hasPortrait, setHasPortrait] = useState(true);
  if (!hasPortrait) return null;
  return (
    <div className="hero-visual">
      <img className="hero-portrait" src={portrait} alt={hero.name} onError={() => setHasPortrait(false)} />
    </div>
  );
}
