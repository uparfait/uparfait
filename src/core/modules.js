import { register, resolveAll } from "./registry";
import Hero from "../modules/hero/Hero";
import Education from "../modules/education/Education";
import Experience from "../modules/experience/Experience";
import Skills from "../modules/skills/Skills";
import Technical from "../modules/technical/Technical";
import Certificates from "../modules/certificates/Certificates";
import Footer from "../modules/footer/Footer";

register("whoami", Hero);
register("education", Education);
register("experience", Experience);
register("skills", Skills);
register("technical", Technical);
register("certificates", Certificates);
register("contact", Footer);

export const order = ["whoami", "education", "experience", "skills", "technical", "certificates", "contact"];
export const sections = resolveAll(order);
