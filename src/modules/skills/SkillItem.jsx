export default function SkillItem({ icon, label }) {
  return (
    <li className="card skill-tile">
      <span className="icon-circle icon-lg">{icon}</span>
      <span className="skill-label">{label}</span>
    </li>
  );
}
