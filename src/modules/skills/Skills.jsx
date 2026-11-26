import { useState } from "react";
import { motion } from "motion/react";
import { FaLayerGroup } from "react-icons/fa";
import Section from "../../shared/Section";
import SectionHeader from "../../shared/SectionHeader";
import SkillItem from "./SkillItem";
import SkillTabs from "./SkillTabs";
import { skills } from "../../content/skills";
import { icons } from "./icons";

export default function Skills() {
  const [active, setActive] = useState(skills.groups[0].id);
  const group = skills.groups.find((g) => g.id === active);
  return (
    <Section id="skills">
      <SectionHeader icon={<FaLayerGroup />} title={skills.title} quotes={skills.quotes} />
      <SkillTabs groups={skills.groups} active={active} onSelect={setActive} />
      <motion.ul
        key={active}
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={`skill-tab-${active}`}
        className="skill-grid"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {group.items.map((item) => (
          <SkillItem key={item.id} icon={icons[item.id]} label={item.label} />
        ))}
      </motion.ul>
    </Section>
  );
}
