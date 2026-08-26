import PinIcon from "../../shared/icons/PinIcon";
import { contact } from "../../content/contact";

export default function FooterInfo() {
  return (
    <div className="space-y-3">
      <p className="location">
        <PinIcon />
        <span>{contact.location}</span>
      </p>
      <p className="copyright">{contact.copyright}</p>
    </div>
  );
}
