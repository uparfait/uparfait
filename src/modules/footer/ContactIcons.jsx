import MailIcon from "../../shared/icons/MailIcon";
import PhoneIcon from "../../shared/icons/PhoneIcon";
import WhatsappIcon from "../../shared/icons/WhatsappIcon";
import { contact } from "../../content/contact";

export default function ContactIcons() {
  return (
    <div className="flex justify-center gap-5">
      <a className="contact-btn" href={`mailto:${contact.email}`} aria-label={contact.emailLabel}><MailIcon /></a>
      <a className="contact-btn" href={`tel:${contact.phone}`} aria-label={contact.phoneLabel}><PhoneIcon /></a>
      <a className="contact-btn" href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label={contact.whatsappLabel}><WhatsappIcon /></a>
    </div>
  );
}
