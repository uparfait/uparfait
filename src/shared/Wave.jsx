export default function Wave({ className }) {
  return (
    <svg className={`wave ${className}`} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
      <path className="wave-line" d="M0 64 C 280 132 640 4 1200 72" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
