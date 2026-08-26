import { FaGraduationCap } from "react-icons/fa";
import Section from "../../shared/Section";
import SplitSection from "../../shared/SplitSection";
import CardDeck from "../../shared/CardDeck";
import { education } from "../../content/education";

export default function Education() {
  return (
    <Section id="education" preset="left" sticky>
      <SplitSection title={education.title} quotes={education.quotes} illustration={<FaGraduationCap className="section-icon" size={80} />}>
        <CardDeck items={education.cards} labels={education.labels} />
      </SplitSection>
    </Section>
  );
}
