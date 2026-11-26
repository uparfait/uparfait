import { nav } from "../../content/nav";

export default function NavLinks({ className, active, onNavigate, children }) {
  return (
    <nav className={className}>
      {nav.links.map((link) => (
        <a key={link.id} href={`#${link.id}`} onClick={onNavigate} className={active === link.id ? "active" : ""}>
          {link.label}
        </a>
      ))}
      {children}
    </nav>
  );
}
