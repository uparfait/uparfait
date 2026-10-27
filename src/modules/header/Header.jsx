import { useEffect, useState } from "react";
import { nav } from "../../content/nav";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import MenuIcon from "../../shared/icons/MenuIcon";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);
  return (
    <>
      <header className="site-header">
        <a href="#whoami" className="brand"><span className="brand-accent">{nav.brand.accent}</span>{nav.brand.rest}</a>
        <NavLinks className="desktop-nav" />
        <a href={nav.cta.href} className="btn btn-dark header-cta">{nav.cta.label}</a>
        <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label={nav.menu}><MenuIcon open={open} /></button>
      </header>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
