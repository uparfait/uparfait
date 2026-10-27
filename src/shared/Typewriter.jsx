import useTypewriter from "../hooks/useTypewriter";

export default function Typewriter({ texts, speed, perWord }) {
  const text = useTypewriter(texts, speed, perWord);
  return (
    <span className="typewriter">
      {texts.map((t) => (
        <span key={t} className="typewriter-ghost" aria-hidden="true">
          {t}
          <span className="caret" />
        </span>
      ))}
      <span>
        {text}
        <span className="caret" />
      </span>
    </span>
  );
}
