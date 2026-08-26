export default function Filters() {
  return (
    <svg style={{ width: 0, height: 0, position: "absolute" }} aria-hidden="true">
      <filter id="noise">
        <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="2" seed="1" stitchTiles="stitch" result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
