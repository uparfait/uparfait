import { motion } from "motion/react";
import { hero } from "../../content/hero";

export default function HeroIntro() {
  return (
    <div className="space-y-4">
      {hero.intro.map((line, i) => (
        <motion.p key={line} className="hero-intro-text m-0 text-base leading-relaxed" style={{ color: i === 0 ? "var(--text)" : "var(--muted)", fontWeight: i === 0 ? 700 : 400, textTransform: i === 0 ? "uppercase" : "none" }} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.15 * i, duration: 0.6 }}>
          {line}
        </motion.p>
      ))}
      <motion.a href="#contact" className="btn" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.7, duration: 0.5 }}>
        {hero.cta}
      </motion.a>
    </div>
  );
}
