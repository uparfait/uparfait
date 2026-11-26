export default function TechItem({ icon, label }) {
  return (
    <li className="tech-item">
      <span className="tech-icon">{icon}</span>
      <span>{label}</span>
    </li>
  );
}
