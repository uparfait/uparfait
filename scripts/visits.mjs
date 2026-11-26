import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [user = "uparfait", dir = "stats"] = process.argv.slice(2);
const DAY = 86400000;
const dataFile = join(dir, "visits.json");
const chartFile = join(dir, "visits.svg");

const iso = (t) => new Date(t).toISOString().slice(0, 10);
const addDays = (date, n) => iso(Date.parse(date) + n * DAY);

async function readTotal() {
  const res = await fetch(`https://komarev.com/ghpvc/?username=${user}`, { headers: { "user-agent": "visits-chart" } });
  if (!res.ok) throw new Error(`Counter returned ${res.status}`);
  const numbers = [...(await res.text()).matchAll(/<text[^>]*>([\d,.]+)<\/text>/g)].map((m) => Number(m[1].replace(/[,.]/g, "")));
  if (!numbers.length) throw new Error("No count in counter image");
  return numbers[numbers.length - 1];
}

function record(data, total, today) {
  const { last } = data;
  if (!last) {
    data.last = { date: today, total };
    return;
  }
  const gained = Math.max(0, total - last.total);
  const gap = Math.max(1, Math.round((Date.parse(today) - Date.parse(last.date)) / DAY));
  if (today === last.date) data.days[today] = (data.days[today] || 0) + gained;
  else for (let i = 1; i <= gap; i++) {
    const date = addDays(last.date, i);
    data.days[date] = (data.days[date] || 0) + Math.floor(gained / gap) + (i <= gained % gap ? 1 : 0);
  }
  data.last = { date: today, total };
}

const sum = (data, end, n) => Array.from({ length: n }, (_, i) => data.days[addDays(end, -i)] || 0).reduce((a, b) => a + b, 0);
const fmt = (n) => n.toLocaleString("en-US");

function bars({ x, y, w, h, values, labels, title }) {
  const max = Math.max(1, ...values);
  const step = w / values.length;
  const bw = Math.max(2, step * 0.62);
  const out = [`<text x="${x}" y="${y - 14}" class="label">${title}</text>`, `<text x="${x + w}" y="${y - 14}" class="label" text-anchor="end">max ${fmt(Math.max(0, ...values))}</text>`];
  values.forEach((v, i) => {
    const bh = v ? Math.max(3, (v / max) * h) : 2;
    out.push(`<rect x="${(x + i * step + (step - bw) / 2).toFixed(1)}" y="${(y + h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1.5" fill="${v ? "#D2691E" : "#3a2a20"}"><title>${labels[i]}: ${fmt(v)}</title></rect>`);
  });
  out.push(`<line x1="${x}" y1="${y + h + 0.5}" x2="${x + w}" y2="${y + h + 0.5}" stroke="#333"/>`);
  out.push(`<text x="${x}" y="${y + h + 18}" class="axis">${labels[0]}</text>`, `<text x="${x + w}" y="${y + h + 18}" class="axis" text-anchor="end">${labels[labels.length - 1]}</text>`);
  return out.join("");
}

function render(data, today) {
  const W = 840, H = 360;
  const tiles = [["Today", data.days[today] || 0], ["Last 7 days", sum(data, today, 7)], ["Last 30 days", sum(data, today, 30)], ["Last 365 days", sum(data, today, 365)], ["Total", data.last.total]];
  const tw = (W - 48 - 4 * 12) / 5;
  const tileSvg = tiles.map(([label, value], i) => {
    const x = 24 + i * (tw + 12);
    return `<rect x="${x}" y="64" width="${tw}" height="70" rx="10" fill="#1c1410" stroke="#2e2016"/><text x="${x + 16}" y="92" class="label">${label}</text><text x="${x + 16}" y="120" class="value">${fmt(value)}</text>`;
  }).join("");
  const dayKeys = Array.from({ length: 30 }, (_, i) => addDays(today, i - 29));
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(Date.parse(today.slice(0, 7) + "-01"));
    d.setUTCMonth(d.getUTCMonth() - 11 + i);
    return d.toISOString().slice(0, 7);
  });
  const monthTotals = months.map((m) => Object.entries(data.days).filter(([k]) => k.startsWith(m)).reduce((a, [, v]) => a + v, 0));
  const monthName = (m) => new Date(m + "-01").toLocaleString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Profile visits">
<style>text{font-family:"Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif}.title{font-size:16px;font-weight:700;fill:#D2691E;letter-spacing:1.5px}.label{font-size:12px;fill:#a89a90}.value{font-size:22px;font-weight:700;fill:#ffffff}.axis{font-size:11px;fill:#7d7068}</style>
<rect width="${W}" height="${H}" rx="14" fill="#111111"/>
<text x="24" y="40" class="title">PROFILE VISITS</text><text x="${W - 24}" y="40" class="axis" text-anchor="end">Updated ${today} UTC</text>
${tileSvg}
${bars({ x: 24, y: 186, w: 470, h: 120, values: dayKeys.map((k) => data.days[k] || 0), labels: dayKeys, title: "Daily, last 30 days" })}
${bars({ x: 530, y: 186, w: 286, h: 120, values: monthTotals, labels: months.map(monthName), title: "Monthly, last 12 months" })}
</svg>
`;
}

const data = existsSync(dataFile) ? JSON.parse(readFileSync(dataFile, "utf8")) : { days: {} };
const today = iso(Date.now());
record(data, await readTotal(), today);
writeFileSync(dataFile, JSON.stringify(data, null, 2) + "\n");
writeFileSync(chartFile, render(data, today));
console.log(`Total ${data.last.total}, today ${data.days[today] || 0}`);
