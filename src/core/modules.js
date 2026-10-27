import { register, resolveAll } from "./registry";
import Hero from "../modules/hero/Hero";
import Projects from "../modules/projects/Projects";
import Skills from "../modules/skills/Skills";
import Technical from "../modules/technical/Technical";
import Certificates from "../modules/certificates/Certificates";
import Footer from "../modules/footer/Footer";

register("whoami", Hero);
register("projects", Projects);
register("skills", Skills);
register("technical", Technical);
register("certificates", Certificates);
register("contact", Footer);

export const order = ["whoami", "projects", "skills", "technical", "certificates", "contact"];
export const sections = resolveAll(order);
