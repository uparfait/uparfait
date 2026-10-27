import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const favicon = new URL("./public/favicon.ico", import.meta.url);
const faviconVersion = existsSync(favicon) ? createHash("md5").update(readFileSync(favicon)).digest("hex").slice(0, 8) : "0";

export default defineConfig({
  base: "./",
  define: { __FAVICON_VERSION__: JSON.stringify(faviconVersion) },
  plugins: [
    react(),
    tailwindcss(),
    { name: "favicon-version", transformIndexHtml: (html) => html.replace("./favicon.ico", `./favicon.ico?v=${faviconVersion}`) },
  ],
});
