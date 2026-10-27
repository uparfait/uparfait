import { FaLaptopCode } from "react-icons/fa";
import Section from "../../shared/Section";
import SectionHeader from "../../shared/SectionHeader";
import ProjectItem from "./ProjectItem";
import { projects } from "../../content/projects";
import { icons } from "./icons";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeader icon={<FaLaptopCode />} title={projects.title} quotes={projects.quotes} />
      <ul className="project-list">
        {projects.items.map((item) => (
          <ProjectItem key={item.id} icon={icons[item.id]} visit={projects.visit} {...item} />
        ))}
      </ul>
    </Section>
  );
}
