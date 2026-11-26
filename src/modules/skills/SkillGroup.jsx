import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import SkillItem from "./SkillItem";

export default function SkillGroup({ group, open, onToggle }) {
  const headId = `skill-head-${group.id}`;
  const panelId = `skill-panel-${group.id}`;
  return (
    <div className={`card skill-group${open ? " open" : ""}`}>
      <button id={headId} type="button" className="skill-head" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span>{group.label}</span>
        <FiChevronDown className="skill-chevron" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headId}
            className="skill-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ul className="skill-list">
              {group.items.map((item) => (
                <SkillItem key={item.id} label={item.label} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
