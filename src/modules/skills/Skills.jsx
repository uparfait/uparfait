import { FaLayerGroup } from "react-icons/fa";
import Section from "../../shared/Section";
import SplitSection from "../../shared/SplitSection";
import SkillItem from "./SkillItem";
import { skills } from "../../content/skills";
import { icons } from "./icons";

export default function Skills() {
  return (
    <Section id="skills" preset="zoom" sticky>
      <SplitSection title={skills.title} quotes={skills.quotes} illustration={<FaLayerGroup className="section-icon" size={72} />}>
        <ul className="m-0 grid list-none gap-4 p-0">
          {skills.items.map((item, i) => (
            <SkillItem key={item.id} icon={icons[item.id]} label={item.label} index={i} />
          ))}
        </ul>
      </SplitSection>
    </Section>
  );
}
