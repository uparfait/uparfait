const VERTEX = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec3  uPal[6];
uniform float uN;
uniform sampler2D uText;
uniform vec3  uBurst[3];
uniform float uSurf;

float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float h11(float p){ p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(h12(i), h12(i + vec2(1., 0.)), u.x),
             mix(h12(i + vec2(0., 1.)), h12(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p){
  float s = 0., a = .5;
  for (int i = 0; i < 4; i++){ s += a * vnoise(p); p = p * 2.03 + vec2(17.1, 9.7); a *= .5; }
  return s;
}
float smax(float a, float b, float k){ float h = max(k - abs(a - b), 0.) / k; return max(a, b) + h * h * k * .25; }

vec3 pal(float t){
  t = fract(t) * uN;
  vec3 col = vec3(0.);
  for (int i = 0; i < 6; i++){
    float fi = float(i);
    if (fi < uN){
      float d = t - fi;
      float w = max(0., 1. - abs(d)) + max(0., 1. - abs(d - uN)) + max(0., 1. - abs(d + uN));
      w = w * w * (3. - 2. * w);
      col += uPal[i] * w;
    }
  }
  return col;
}

float surfY(float x){
  float t = uTime;
  float y = uSurf + .006 * sin(x * 9. + t * 1.3) + .004 * sin(x * 23. - t * 2.1);
  for (int i = 0; i < 3; i++){
    vec3 b = uBurst[i];
    float tb = t - b.y;
    if (tb > 0. && tb < 5.){
      float d = abs(x - b.x);
      y += b.z * .014 * sin(d * 48. - tb * 10.) * exp(-tb * 1.1) * exp(-d * 2.5) * smoothstep(0., .04, d);
    }
  }
  return y;
}

float crownH(float x){
  float t = uTime;
  float env = exp(-x * x * 1.7);
  float n1 = fbm(vec2(x * 2.2 + 3., t * .22));
  float h = .025 + env * (.10 + .045 * sin(x * 6. + t * .8) + .035 * sin(x * 13. - t * 1.1 + 1.7) + .09 * (n1 - .45));
  float sp = sin(x * 11. + t * .5 + n1 * 5.);
  h += env * .11 * pow(max(sp, 0.), 8.);
  for (int i = 0; i < 3; i++){
    vec3 b = uBurst[i];
    float tb = t - b.y;
    if (tb > 0. && tb < 3.){
      float dx = x - b.x;
      float rise = tb * exp(1. - tb * 3.) * 3.;
      h += b.z * .26 * rise * exp(-dx * dx * 110.);
      h += b.z * .07 * rise * exp(-dx * dx * 25.);
    }
  }
  return h;
}

vec2 textUV(vec2 p){
  vec2 uv = vec2(p.x * uRes.y / uRes.x + .5, p.y + .5);
  float t = uTime;
  uv += .0045 * vec2(vnoise(p * 6. + t * .55) - .5, vnoise(p * 6. + 31. - t * .5) - .5) * 2.;
  return uv;
}

float field(vec2 p, out float tm){
  float t = uTime;
  float s = surfY(p.x);
  float F = (s + crownH(p.x)) - p.y;

  for (int i = 0; i < 14; i++){
    float fi = float(i);
    float vy = .42 + h11(fi * 3.7 + 1.) * .32;
    float g = .62;
    float per = 2. * vy / g;
    float tt = mod(t * .9 + h11(fi * 9.1 + 2.) * 6., per + .7);
    if (tt < per){
      float x0 = (h11(fi * 1.7 + 3.) - .5) * 1.15;
      float vx = (h11(fi * 5.3 + 4.) - .5) * .32;
      vec2 c = vec2(x0 + vx * tt, uSurf + .05 + vy * tt - .5 * g * tt * tt);
      vec2 v = vec2(vx, vy - g * tt);
      float sp = length(v);
      vec2 dir = v / max(sp, 1e-3);
      vec2 q = p - c;
      float r = .007 + h11(fi * 2.3 + 5.) * .013;
      float a = dot(q, dir), b = dot(q, vec2(-dir.y, dir.x));
      F = smax(F, r - length(vec2(a / (1. + sp * .7), b)), .035);
    }
  }

  for (int j = 0; j < 3; j++){
    vec3 bb = uBurst[j];
    float tb = t - bb.y;
    if (tb > 0. && tb < 2.4){
      for (int i = 0; i < 9; i++){
        float fi = float(i) + float(j) * 13.;
        float ang = mix(.45, 2.69, (float(i) + h11(fi * 4.1) * .7) / 9.);
        float spd = (.42 + h11(fi * 6.2) * .45) * bb.z;
        vec2 c = vec2(bb.x, uSurf + .05) + vec2(cos(ang), sin(ang)) * spd * tb + vec2(0., -.45 * tb * tb);
        float r = (.007 + h11(fi * 8.8) * .014) * (1. - smoothstep(1.4, 2.4, tb));
        F = smax(F, r - length(p - c), .03);
      }
    }
  }

  float m = texture2D(uText, textUV(p)).r;
  tm = m;
  F = smax(F, (m - .5) * .055, .045);
  return F;
}

float heightAt(vec2 p, out float F, out float tm){
  F = field(p, tm);
  float h = smoothstep(0., .03, F);
  h += .55 * smoothstep(.3, .78, tm);
  float n = fbm(p * vec2(4., 6.) + vec2(uTime * .12, -uTime * .08));
  float ridge = 1. - abs(n * 2. - 1.);
  h += .35 * ridge * smoothstep(0., .06, F);
  return h;
}

vec3 liquidColor(vec2 p, vec3 n, float F, float tm){
  float t = uTime;
  float flow = fbm(p * 2.4 + vec2(t * .15, -t * .1));
  vec3 inner = pal(flow * 1.3 + p.x * .35 + n.x * .45 + n.y * .25 + t * .03);
  vec3 rim   = pal(flow * .8 + .5 + p.y * .7 - n.x * .3);
  float thick = clamp(F * 14., 0., 1.);
  float fres = pow(1. - clamp(n.z, 0., 1.), 2.2);

  vec3 col = mix(vec3(.92), inner * 1.12, .62 + .38 * thick);
  col = mix(col, rim * 1.35 + .05, fres * .85);
  col += inner * pow(thick, 3.) * .12;
  col += inner * smoothstep(.45, .9, tm) * .18;

  vec3 V = vec3(0., 0., 1.);
  vec3 L1 = normalize(vec3(-.55, .75, .7));
  vec3 L2 = normalize(vec3(.8, .25, .55));
  float s1 = pow(max(dot(n, normalize(L1 + V)), 0.), 90.);
  float s2 = pow(max(dot(n, normalize(L2 + V)), 0.), 35.);
  col += vec3(1.) * s1 * 1.4;
  col += mix(pal(.25), vec3(1.), .4) * s2 * .55;
  return col;
}

vec4 shadeFull(vec2 p){
  float px = 1.4 / uRes.y;
  float F, tm, F2, tm2;
  float h0 = heightAt(p, F, tm);
  if (F < -px * 2.) return vec4(0.);
  float e = 1.5 / uRes.y;
  float hx = heightAt(p + vec2(e, 0.), F2, tm2);
  float hy = heightAt(p + vec2(0., e), F2, tm2);
  vec3 n = normalize(vec3(-(hx - h0) / e * .045, -(hy - h0) / e * .045, 1.));
  return vec4(liquidColor(p, n, F, tm), smoothstep(-px, px, F));
}

vec4 shadeSimple(vec2 p){
  float tm;
  float F = field(p, tm);
  float px = 2. / uRes.y;
  float flow = fbm(p * 2.4 + vec2(uTime * .15, -uTime * .1));
  vec3 liq = pal(flow * 1.3 + p.x * .35 + uTime * .03) * .95;
  liq += pal(.5 + p.y) * (1. - smoothstep(0., .02, F)) * .5;
  return vec4(liq, smoothstep(-px, px, F));
}

void main(){
  vec2 p = (gl_FragCoord.xy - .5 * uRes) / uRes.y;
  float s = surfY(p.x);
  vec4 col;
  if (p.y >= s){
    col = shadeFull(p);
  } else {
    float depth = s - p.y;
    vec2 rp = vec2(p.x, 2. * s - p.y);
    float w = vnoise(vec2(p.x * 14., depth * 60. - uTime * 1.5));
    rp.x += (w - .5) * .03 * (.3 + depth * 4.);
    rp.y += (vnoise(vec2(p.x * 9. + 5., depth * 40. + uTime)) - .5) * .02;
    vec4 refl = shadeSimple(rp);
    float flow = fbm(p * 2.4 + vec2(uTime * .15, -uTime * .1));
    vec3 water = mix(pal(flow + p.x * .3 + uTime * .03), pal(flow + .5) * .6, smoothstep(0., .3, depth));
    vec3 c = mix(water, refl.rgb, refl.a * (exp(-depth * 4.) * .6 + .1));
    float gl = vnoise(vec2(p.x * 60. + uTime * .5, depth * 220. - uTime * 3.));
    c += vec3(1.) * pow(gl, 22.) * 1.2 * exp(-depth * 6.);
    c += vec3(1.) * smoothstep(.004, 0., depth) * .35;
    col = vec4(c, 1. - smoothstep(.03, .22, depth));
  }
  vec2 q = gl_FragCoord.xy / uRes;
  float side = smoothstep(0., .07, q.x) * smoothstep(1., .93, q.x);
  float poolSide = smoothstep(0., .25, q.x) * smoothstep(1., .75, q.x);
  float nearSurf = 1. - smoothstep(.02, .12, p.y - s);
  float fade = mix(side, poolSide, nearSurf) * smoothstep(1., .92, q.y);
  vec3 rgb = 1. - exp(-col.rgb * 1.6);
  gl_FragColor = vec4(pow(rgb, vec3(.92)), col.a * fade);
}
`;

const FONT = '"Montserrat", "Inter", sans-serif';

const toRgb = (c) => (typeof c === "string" ? [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255) : c);
const lum = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

function hsl([r, g, b]) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}

export const supportsWebGL = (() => {
  const gl = document.createElement("canvas").getContext("webgl");
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
  return Boolean(gl);
})();

export function createFluid(canvas, { message, colors }) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) return null;

  const shaders = [];
  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    shaders.push(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  try {
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch {
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const U = {};
  for (const k of ["uRes", "uTime", "uPal", "uN", "uText", "uBurst", "uSurf"]) U[k] = gl.getUniformLocation(prog, k);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(U.uText, 0);

  const textCanvas = document.createElement("canvas");
  const tctx = textCanvas.getContext("2d");
  let text = message;

  function layoutLines(words, n) {
    const width = (arr) => tctx.measureText(arr.join(" ")).width;
    if (n === 1 || words.length < n) return [words.join(" ")];
    let best = null;
    for (let a = 1; a < words.length; a++) {
      const splits = n === 2 ? [[a]] : Array.from({ length: words.length - a - 1 }, (_, i) => [a, a + 1 + i]);
      for (const cut of splits) {
        const lines = cut.length === 1 ? [words.slice(0, a), words.slice(a)] : [words.slice(0, cut[0]), words.slice(cut[0], cut[1]), words.slice(cut[1])];
        const w = Math.max(...lines.map(width));
        if (!best || w < best.w) best = { w, lines };
      }
    }
    return best.lines.map((l) => l.join(" "));
  }

  function drawText() {
    const H = 512;
    const aspect = canvas.width / canvas.height;
    const W = Math.max(64, Math.round(H * aspect));
    textCanvas.width = W;
    textCanvas.height = H;
    tctx.fillStyle = "#000";
    tctx.fillRect(0, 0, W, H);
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length) {
      let best = null;
      for (let n = 1; n <= Math.min(3, words.length); n++) {
        tctx.font = `800 100px ${FONT}`;
        const lines = layoutLines(words, n);
        const maxW = Math.max(...lines.map((l) => tctx.measureText(l).width));
        const fs = Math.min((W * 0.84 * 100) / maxW, (H * 0.5) / n, H * 0.23);
        if (!best || fs > best.fs * 1.08) best = { lines, fs };
      }
      const { lines, fs } = best;
      const lh = fs * 0.98;
      const centerY = H * (0.5 - 0.07) + (aspect < 0.9 ? -H * 0.03 : 0);
      const off = W * 3;
      tctx.font = `800 ${fs}px ${FONT}`;
      tctx.textAlign = "center";
      tctx.textBaseline = "middle";
      tctx.shadowColor = "#fff";
      tctx.shadowBlur = Math.max(8, fs * 0.11);
      tctx.shadowOffsetX = off;
      tctx.fillStyle = "#fff";
      lines.forEach((l, i) => tctx.fillText(l, W / 2 - off, centerY + (i - (lines.length - 1) / 2) * lh + fs * 0.06));
      tctx.shadowColor = "transparent";
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
  }

  let renderScale = Math.min(window.devicePixelRatio || 1, 1.25);
  function resize() {
    const r = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width * renderScale));
    const h = Math.max(1, Math.round(r.height * renderScale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      drawText();
    }
  }

  let palCur = [], palTarget = [], palN = 3;
  function applyPalette(list, instant = false) {
    let cols = list.slice(0, 6);
    if (cols.length === 1) cols.push(cols[0].map((v) => Math.min(1, v * 1.5 + 0.15)), cols[0].map((v) => v * 0.45));
    const chroma = cols.filter((c) => hsl(c)[1] > 0.15).sort((a, b) => hsl(a)[0] - hsl(b)[0]);
    const greys = cols.filter((c) => hsl(c)[1] <= 0.15).sort((a, b) => lum(b) - lum(a));
    cols = chroma.concat(greys);
    palN = cols.length;
    palTarget = Array.from({ length: 6 }, (_, i) => cols[i % cols.length].slice());
    if (instant) palCur = palTarget.map((c) => c.slice());
  }
  applyPalette(colors.map(toRgb), true);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bursts = [[0, -99, 0], [0, -99, 0], [0, -99, 0]];
  let burstIdx = 0;
  const start = performance.now();
  const now = () => (performance.now() - start) / 1000;
  function splash(x, strength = 1) {
    bursts[burstIdx] = [x, now(), strength];
    burstIdx = (burstIdx + 1) % 3;
  }

  const onPointer = (e) => {
    const r = canvas.getBoundingClientRect();
    splash(((e.clientX - r.left) / r.width - 0.5) * (r.width / r.height), 0.9 + Math.random() * 0.3);
  };
  canvas.addEventListener("pointerdown", onPointer);

  let raf = 0, visible = false, alive = true, nextAuto = 3, prevT = 0, frames = 0, acc = 0, last = 0;
  function frame() {
    raf = 0;
    if (!visible || !alive) return;
    resize();
    const t = now();
    const dt = Math.min(0.25, t - prevT);
    prevT = t;
    if (!reduceMotion && t > nextAuto) {
      splash((Math.random() - 0.5) * (canvas.width / canvas.height) * 0.7, 0.7 + Math.random() * 0.4);
      nextAuto = t + 4 + Math.random() * 4;
    }
    const k = 1 - Math.exp(-dt * 3);
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) palCur[i][j] += (palTarget[i][j] - palCur[i][j]) * k;

    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uTime, reduceMotion ? t * 0.25 : t);
    gl.uniform3fv(U.uPal, new Float32Array(palCur.flat()));
    gl.uniform1f(U.uN, palN);
    gl.uniform3fv(U.uBurst, new Float32Array(bursts.flat()));
    gl.uniform1f(U.uSurf, canvas.width < canvas.height ? -0.27 : -0.24);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    const nowMs = performance.now();
    acc += nowMs - last;
    last = nowMs;
    if (++frames === 40) {
      if (acc / frames > 26 && renderScale > 0.5) renderScale = Math.max(0.5, renderScale * 0.8);
      frames = 0;
      acc = 0;
    }
    raf = requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !raf) {
      last = performance.now();
      frames = 0;
      acc = 0;
      raf = requestAnimationFrame(frame);
    }
  });
  io.observe(canvas);
  document.fonts?.load(`800 100px "Montserrat"`).then(() => alive && drawText(), () => {});

  return {
    setMessage(m) {
      text = m;
      drawText();
    },
    setPalette(list) {
      applyPalette(list.map(toRgb));
      splash(0, 1.1);
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("pointerdown", onPointer);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      shaders.forEach((s) => gl.deleteShader(s));
    },
  };
}
