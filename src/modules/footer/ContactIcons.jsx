import MailIcon from "../../shared/icons/MailIcon";
import PhoneIcon from "../../shared/icons/PhoneIcon";
import WhatsappIcon from "../../shared/icons/WhatsappIcon";
import { reveal } from "../../shared/secret";
import { contact } from "../../content/contact";

const icons = { email: <MailIcon />, phone: <PhoneIcon />, whatsapp: <WhatsappIcon /> };

function open({ sealed, newTab }) {
  const url = reveal(sealed);
  if (newTab) window.open(url, "_blank", "noopener,noreferrer");
  else window.location.href = url;
}

export default function ContactIcons() {
  return (
    <div className="flex justify-center gap-5">
      {contact.links.map((link) => (
        <button key={link.id} type="button" className="contact-btn" onClick={() => open(link)} aria-label={link.label}>
          {icons[link.id]}
        </button>
      ))}
    </div>
  );
}
