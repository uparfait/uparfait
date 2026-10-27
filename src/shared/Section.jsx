export default function Section({ id, tone = "", children }) {
  return (
    <section id={id} className={`section ${tone}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
