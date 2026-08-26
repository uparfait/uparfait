import { nav } from "../../content/nav";
import useActiveSection from "../../hooks/useActiveSection";

const ids = nav.links.map((link) => link.id);

export default function NavLinks({ className, onNavigate }) {
  const active = useActiveSection(ids);
  return (
    <nav className={className}>
      {nav.links.map((link) => (
        <a key={link.id} href={`#${link.id}`} onClick={onNavigate} className={active === link.id ? "active" : ""}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
