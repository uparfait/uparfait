import { motion } from "motion/react";
import ContactIcons from "./ContactIcons";
import FooterInfo from "./FooterInfo";
import { contact } from "../../content/contact";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <motion.div className="mx-auto max-w-6xl space-y-7 text-center" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.7 }}>
        <h2 className="section-title center">{contact.title}</h2>
        <ContactIcons />
        <FooterInfo />
      </motion.div>
    </footer>
  );
}
