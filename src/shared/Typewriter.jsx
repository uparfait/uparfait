import useTypewriter from "../hooks/useTypewriter";

export default function Typewriter({ texts, speed, pause }) {
  const text = useTypewriter(texts, speed, pause);
  return (
    <span>
      {text}
      <span className="caret" />
    </span>
  );
}
