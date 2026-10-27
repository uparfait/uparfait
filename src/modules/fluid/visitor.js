function normalizeSvg(text) {
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const svg = doc.documentElement;
  if (!svg || svg.nodeName.toLowerCase() !== "svg" || doc.getElementsByTagName("parsererror").length) throw new Error("Invalid SVG");
  if (!svg.getAttribute("xmlns")) svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  let w = parseFloat(svg.getAttribute("width"));
  let h = parseFloat(svg.getAttribute("height"));
  const vb = (svg.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
  if ((!w || !h) && vb.length === 4 && vb[2] > 0 && vb[3] > 0) [w, h] = [vb[2], vb[3]];
  if (!w || !h) [w, h] = [300, 300];
  if (!svg.getAttribute("viewBox")) svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const scale = 240 / Math.max(w, h);
  svg.setAttribute("width", Math.round(w * scale));
  svg.setAttribute("height", Math.round(h * scale));
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  return new XMLSerializer().serializeToString(svg);
}

function colorsFromPixels(img) {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth || 240;
  c.height = img.naturalHeight || 240;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  const buckets = new Map();
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 160) continue;
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const e = buckets.get(key) || [0, 0, 0, 0];
    e[0] += r; e[1] += g; e[2] += b; e[3]++;
    buckets.set(key, e);
    total++;
  }
  const picked = [];
  [...buckets.values()]
    .map((e) => ({ c: [e[0] / e[3], e[1] / e[3], e[2] / e[3]], n: e[3] }))
    .sort((a, b) => b.n - a.n)
    .forEach((it) => {
      const near = picked.find((p) => Math.hypot(p.c[0] - it.c[0], p.c[1] - it.c[1], p.c[2] - it.c[2]) < 42);
      if (near) near.n += it.n;
      else picked.push({ ...it });
    });
  return picked
    .filter((p) => p.n >= total * 0.006)
    .sort((a, b) => b.n - a.n)
    .slice(0, 6)
    .map((p) => p.c.map((v) => v / 255));
}

function colorsFromMarkup(text) {
  const probe = document.createElement("canvas").getContext("2d");
  const found = new Map();
  const re = /(?:fill|stroke|stop-color|color)\s*[:=]\s*["']?\s*(#[0-9a-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-z]+)/gi;
  for (const m of text.matchAll(re)) {
    const v = m[1].toLowerCase();
    if (["none", "transparent", "currentcolor", "inherit", "url"].includes(v)) continue;
    probe.fillStyle = "#010203";
    probe.fillStyle = v;
    const norm = probe.fillStyle;
    if (norm === "#010203" && v !== "#010203") continue;
    found.set(norm, (found.get(norm) || 0) + 1);
  }
  return [...found.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([hex]) => (hex.startsWith("#") ? [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) : hex.match(/[\d.]+/g).slice(0, 3).map((v) => +v / 255)));
}

async function flagColors(src) {
  const res = await fetch(src, { signal: AbortSignal.timeout(8000) });
  const text = await res.text();
  if (!res.ok || !/<svg[\s>]/i.test(text)) throw new Error("Not an SVG");
  const url = URL.createObjectURL(new Blob([normalizeSvg(text)], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    const colors = colorsFromPixels(img);
    if (colors.length) return colors;
    const markup = colorsFromMarkup(text);
    if (markup.length) return markup;
    throw new Error("No colors");
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function loadVisitor(geo, flags) {
  let info;
  try {
    info = await (await fetch(geo, { signal: AbortSignal.timeout(8000) })).json();
  } catch {
    return {};
  }
  if (!info?.success) return {};
  const sources = [info.flag?.img, info.country_code && flags.replace("{code}", info.country_code.toLowerCase())].filter(Boolean);
  for (const src of sources) {
    try {
      return { country: info.country, colors: await flagColors(src) };
    } catch {
      continue;
    }
  }
  return { country: info.country };
}
