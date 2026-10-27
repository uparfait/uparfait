import ArrowIcon from "../../shared/icons/ArrowIcon";
import { hero } from "../../content/hero";

export default function HeroIntro() {
  const [lead, ...rest] = hero.intro;
  return (
    <div className="hero-intro">
      <p className="hero-text"><strong>{lead}</strong> {rest.join(" ")}</p>
      <div className="hero-actions">
        <a href="#projects" className="btn btn-accent">
          {hero.projectsCta}
          <span className="btn-icon"><ArrowIcon /></span>
        </a>
      </div>
    </div>
  );
}
