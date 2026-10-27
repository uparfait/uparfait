import { useEffect, useRef } from "react";
import { createFluid, supportsWebGL } from "./engine";
import { loadVisitor } from "./visitor";
import { fluid } from "../../content/fluid";
import "./fluid.css";

export default function Fluid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!supportsWebGL) return;
    const engine = createFluid(canvasRef.current, { message: fluid.fallback, colors: fluid.colors });
    if (!engine) return;
    let active = true;
    loadVisitor(fluid.geo, fluid.flags).then(({ country, colors }) => {
      if (!active) return;
      if (country) engine.setMessage(`${country} ${fluid.again}`);
      if (colors) engine.setPalette(colors);
    });
    return () => {
      active = false;
      engine.destroy();
    };
  }, []);
  if (!supportsWebGL) return null;
  return (
    <div className="fluid-card">
      <canvas ref={canvasRef} className="fluid-canvas" role="img" aria-label={fluid.label} />
    </div>
  );
}
