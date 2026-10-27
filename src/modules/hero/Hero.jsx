import Section from "../../shared/Section";
import HeroPanel from "./HeroPanel";
import HeroIntro from "./HeroIntro";
import Fluid from "../fluid/Fluid";
import "./hero.css";

export default function Hero() {
  return (
    <Section id="whoami" tone="hero">
      <div className="hero-grid">
        <HeroPanel />
        <HeroIntro />
        <Fluid />
      </div>
    </Section>
  );
}
