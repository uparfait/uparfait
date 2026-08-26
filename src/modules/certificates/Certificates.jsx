import { FaMedal } from "react-icons/fa";
import Section from "../../shared/Section";
import CertGroup from "./CertGroup";
import { certificates } from "../../content/certificates";

export default function Certificates() {
  return (
    <Section id="certificates" preset="flip" sticky>
      <div className="flex flex-col items-center gap-5 text-center">
        <FaMedal className="section-icon" size={72} />
        <h2 className="section-title center">{certificates.title}</h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {certificates.groups.map((group, i) => (
          <CertGroup key={group.from} group={group} index={i} />
        ))}
      </div>
    </Section>
  );
}
