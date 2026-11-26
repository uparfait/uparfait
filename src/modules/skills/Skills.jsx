import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import Section from "../../shared/Section";
import SectionHeader from "../../shared/SectionHeader";
import SkillGroup from "./SkillGroup";
import { skills } from "../../content/skills";

export default function Skills() {
  const [open, setOpen] = useState(skills.groups[0].id);
  return (
    <Section id="skills">
      <SectionHeader icon={<FaLayerGroup />} title={skills.title} quotes={skills.quotes} />
      <div className="skill-groups">
        {skills.groups.map((group) => (
          <SkillGroup key={group.id} group={group} open={open === group.id} onToggle={() => setOpen((v) => (v === group.id ? null : group.id))} />
        ))}
      </div>
    </Section>
  );
}
