import Section from "../../shared/Section";
import SectionHeader from "../../shared/SectionHeader";
import SkillBar from "./SkillBar";
import { technical } from "../../content/technical";

export default function Technical() {
  const bars = [...technical.bars].sort((a, b) => b.value - a.value);
  return (
    <Section id="technical">
      <div className="dark-card technical-card">
        <SectionHeader title={technical.title} />
        <div className="fill-last grid gap-x-12 gap-y-7 md:grid-cols-2">
          {bars.map((bar) => (
            <SkillBar key={bar.label} {...bar} />
          ))}
        </div>
      </div>
    </Section>
  );
}
