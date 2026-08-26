import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DeckControls({ index, total, labels, onStep }) {
  return (
    <div className="flex items-center gap-6">
      <button className="nav-btn" onClick={() => onStep(-1)} aria-label={labels.back}><FiChevronLeft size={26} /></button>
      <span className="text-sm" style={{ color: "var(--muted)" }}>{index + 1} {labels.counter} {total}</span>
      <button className="nav-btn" onClick={() => onStep(1)} aria-label={labels.next}><FiChevronRight size={26} /></button>
    </div>
  );
}
