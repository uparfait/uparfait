import { FaMedal } from "react-icons/fa";
import Section from "../../shared/Section";
import SectionHeader from "../../shared/SectionHeader";
import CertGroup from "./CertGroup";
import { certificates } from "../../content/certificates";

export default function Certificates() {
  return (
    <Section id="certificates">
      <SectionHeader icon={<FaMedal />} title={certificates.title} />
      <div className="fill-last grid gap-4 md:grid-cols-2">
        {certificates.groups.map((group) => (
          <CertGroup key={group.from} group={group} />
        ))}
      </div>
    </Section>
  );
}
