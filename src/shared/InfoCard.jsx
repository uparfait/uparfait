import PinIcon from "./icons/PinIcon";
import "../styles/infocard.css";

export default function InfoCard({ period, title, place, note, index }) {
  return (
    <div className="info-card">
      <span className="ic-period">{period}</span>
      <h3 className="ic-title">{title}</h3>
      <p className="ic-place">
        <PinIcon />
        <span>{place}</span>
      </p>
      <p className="ic-note">{note}</p>
      <span className="ic-index">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}
