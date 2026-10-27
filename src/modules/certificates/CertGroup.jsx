import CertIcon from "../../shared/icons/CertIcon";

export default function CertGroup({ group }) {
  return (
    <div className="card cert-card">
      <h3 className="eyebrow">{group.from}</h3>
      <ul className="cert-list">
        {group.items.map((item) => (
          <li key={item}>
            <span className="icon-circle icon-sm"><CertIcon /></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
