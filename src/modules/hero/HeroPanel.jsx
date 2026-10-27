import Typewriter from "../../shared/Typewriter";
import Wave from "../../shared/Wave";
import HeroVisual from "./HeroVisual";
import { hero } from "../../content/hero";

export default function HeroPanel() {
  return (
    <div className="dark-card hero-card">
      <div className="hero-copy">
        <h1 className="hero-title">
          {hero.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero-role">
          <Typewriter texts={hero.roles} />
        </p>
      </div>
      <HeroVisual />
      <Wave className="hero-wave" />
    </div>
  );
}
