import Section from "../../shared/Section";
import HeroPanel from "./HeroPanel";
import "./hero.css";

export default function Hero() {
  return (
    <Section id="whoami" preset="up" tone="hero-bg" sticky>
      <HeroPanel />
    </Section>
  );
}
