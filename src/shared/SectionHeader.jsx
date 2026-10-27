import Typewriter from "./Typewriter";

export default function SectionHeader({ icon, title, quotes }) {
  return (
    <div className="section-header">
      <div className="section-heading">
        {icon && <span className="icon-circle icon-lg">{icon}</span>}
        <h2 className="section-title">{title}</h2>
      </div>
      {quotes && (
        <p className="quote">
          <Typewriter texts={quotes} />
        </p>
      )}
    </div>
  );
}
