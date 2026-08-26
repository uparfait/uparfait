import Typewriter from "../../shared/Typewriter";
import HeroIntro from "./HeroIntro";
import { hero } from "../../content/hero";

export default function HeroPanel() {
  return (
    <div className="hero-frame">
      <span className="frame-label top">{hero.name}</span>
      <HeroIntro />
      <span className="frame-label bottom">
        <Typewriter texts={hero.roles} />
      </span>
    </div>
  );
}
