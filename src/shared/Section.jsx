import { motion } from "motion/react";
import { presets } from "./motionPresets";

export default function Section({ id, preset = "up", tone = "", sticky = false, children }) {
  const p = presets[preset] || presets.up;
  return (
    <section id={id} className={`section ${tone} ${sticky ? "sticky-section" : ""}`}>
      <motion.div
        className="mx-auto w-full max-w-6xl"
        initial={p.initial}
        whileInView={p.whileInView}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
