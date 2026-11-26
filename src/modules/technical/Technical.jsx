import Section from "../../shared/Section";
import SectionHeader from "../../shared/SectionHeader";
import TechItem from "./TechItem";
import { technical } from "../../content/technical";
import { icons } from "./icons";

export default function Technical() {
  return (
    <Section id="technical">
      <div className="dark-card technical-card">
        <SectionHeader title={technical.title} />
        <ul className="tech-grid">
          {technical.items.map((item) => (
            <TechItem key={item.id} icon={icons[item.id]} label={item.label} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
