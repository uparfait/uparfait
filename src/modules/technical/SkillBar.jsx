import { motion } from "motion/react";

export default function SkillBar({ label, value, index }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span style={{ color: "var(--accent)" }}>{value}%</span>
      </div>
      <div className="h-3" style={{ background: "var(--line)" }}>
        <motion.div className="h-full" style={{ background: "var(--accent)" }} initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }} />
      </div>
    </div>
  );
}
