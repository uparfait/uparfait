import { motion } from "motion/react";

export default function SkillItem({ icon, label, index }) {
  return (
    <motion.li
      className="panel flex items-center gap-4 p-4"
      initial={{ opacity: 0, x: 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ x: 8 }}
    >
      <span style={{ color: "var(--primary)" }}>{icon}</span>
      <span className="font-medium">{label}</span>
    </motion.li>
  );
}
