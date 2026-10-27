import { motion } from "motion/react";
import NavLinks from "./NavLinks";
import { nav } from "../../content/nav";

export default function MobileMenu({ onClose }) {
  return (
    <motion.div
      className="mobile-wrap"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <NavLinks className="mobile-menu" onNavigate={onClose}>
        <a href={nav.cta.href} className="btn btn-dark" onClick={onClose}>{nav.cta.label}</a>
      </NavLinks>
    </motion.div>
  );
}
