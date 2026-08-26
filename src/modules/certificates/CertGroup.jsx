import { motion } from "motion/react";
import CertIcon from "../../shared/icons/CertIcon";

export default function CertGroup({ group, index }) {
  return (
    <motion.div className="panel space-y-4 p-6 text-left" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: index * 0.15, duration: 0.6 }}>
      <h3 className="m-0 p-3 text-sm font-bold tracking-widest" style={{ color: "var(--primary)" }}>{group.from}</h3>
      <ul className="m-0 list-none space-y-3 p-2">
        {group.items.map((item) => (
          <li key={item} className="flex items-center gap-3 p-3">
            <span style={{ color: "var(--primary)" }}><CertIcon /></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
