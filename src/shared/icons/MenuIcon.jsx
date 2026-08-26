import { FiMenu, FiX } from "react-icons/fi";

export default function MenuIcon({ open }) {
  return open ? <FiX size={22} /> : <FiMenu size={22} />;
}
