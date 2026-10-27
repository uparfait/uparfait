export default function SkillBar({ label, value }) {
  return (
    <div>
      <div className="bar-head">
        <span>{label}</span>
        <span className="bar-value">{value}%</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
