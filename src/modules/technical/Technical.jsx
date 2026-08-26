import Section from "../../shared/Section";
import SkillBar from "./SkillBar";
import { technical } from "../../content/technical";

export default function Technical() {
  const bars = [...technical.bars].sort((a, b) => b.value - a.value);
  return (
    <Section id="technical" preset="up" tone="tone-deep" sticky>
      <div className="text-center">
        <h2 className="section-title center">{technical.title}</h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {bars.map((bar, i) => (
          <SkillBar key={bar.label} {...bar} index={i} />
        ))}
      </div>
    </Section>
  );
}
