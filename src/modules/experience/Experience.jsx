import { FaBriefcase } from "react-icons/fa";
import Section from "../../shared/Section";
import SplitSection from "../../shared/SplitSection";
import CardDeck from "../../shared/CardDeck";
import { experience } from "../../content/experience";

export default function Experience() {
  return (
    <Section id="experience" preset="right" sticky>
      <SplitSection title={experience.title} quotes={experience.quotes} illustration={<FaBriefcase className="section-icon" size={72} />}>
        <CardDeck items={experience.cards} labels={experience.labels} />
      </SplitSection>
    </Section>
  );
}
