export const presets = {
  up: { initial: { opacity: 0, y: 90 }, whileInView: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -90 }, whileInView: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 90 }, whileInView: { opacity: 1, x: 0 } },
  zoom: { initial: { opacity: 0, scale: 0.85 }, whileInView: { opacity: 1, scale: 1 } },
  flip: { initial: { opacity: 0, rotateX: 20, y: 70 }, whileInView: { opacity: 1, rotateX: 0, y: 0 } },
};
