import Typewriter from "./Typewriter";

export default function SplitSection({ title, quotes, illustration, children }) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="space-y-6">
        {illustration}
        <h2 className="section-title">{title}</h2>
        <p className="quote">
          <Typewriter texts={quotes} />
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
