import { useState } from "react";
import { nav } from "../../content/nav";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import MenuIcon from "../../shared/icons/MenuIcon";
import "./header.css";
const logo = `${import.meta.env.BASE_URL}favicon.ico`;
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="#whoami" className="brand" aria-label={nav.brand}><img className="brand-logo avatar" src={logo} alt="" onError={(e) => e.currentTarget.remove()} /></a>
      <NavLinks className="desktop-nav" />
      <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label={nav.menu}><MenuIcon open={open} /></button>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}
