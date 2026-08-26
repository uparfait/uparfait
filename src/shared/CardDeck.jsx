import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import InfoCard from "./InfoCard";
import DeckControls from "./DeckControls";
import useAutoAdvance from "../hooks/useAutoAdvance";
export default function CardDeck({ items, labels }) {
  const [index, setIndex] = useState(0);
  const step = (d) => setIndex((v) => (v + d + items.length) % items.length);
  useAutoAdvance(setIndex, items.length);
  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 90 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -90 }} transition={{ duration: 0.45 }}>
          <InfoCard {...items[index]} index={index} />
        </motion.div>
      </AnimatePresence>
      {items.length > 1 && <DeckControls index={index} total={items.length} labels={labels} onStep={step} />}
    </div>
  );
}
