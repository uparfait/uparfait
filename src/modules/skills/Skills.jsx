import { FaLayerGroup } from "react-icons/fa";
import Section from "../../shared/Section";
import SectionHeader from "../../shared/SectionHeader";
import SkillItem from "./SkillItem";
import { skills } from "../../content/skills";
import { icons } from "./icons";

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader icon={<FaLayerGroup />} title={skills.title} quotes={skills.quotes} />
      <ul className="skill-grid">
        {skills.items.map((item) => (
          <SkillItem key={item.id} icon={icons[item.id]} label={item.label} />
        ))}
      </ul>
    </Section>
  );
}
