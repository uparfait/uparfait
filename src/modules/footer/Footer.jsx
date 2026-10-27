import ContactIcons from "./ContactIcons";
import FooterInfo from "./FooterInfo";
import { contact } from "../../content/contact";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="section footer">
      <div className="mx-auto w-full max-w-6xl">
        <div className="dark-card contact-card">
          <div className="contact-content">
            <h2 className="section-title">{contact.title}</h2>
            <p className="contact-note">{contact.controls}</p>
            <ContactIcons />
          </div>
        </div>
        <FooterInfo />
      </div>
    </footer>
  );
}
