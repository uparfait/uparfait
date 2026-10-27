import PinIcon from "../../shared/icons/PinIcon";
import { contact } from "../../content/contact";

export default function FooterInfo() {
  return (
    <div className="footer-bar">
      <p className="location">
        <span className="icon-circle icon-sm"><PinIcon /></span>
        <span>{contact.location}</span>
      </p>
      <p className="copyright">{contact.motto}</p>
    </div>
  );
}
