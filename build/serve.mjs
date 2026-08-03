/**
 * Lokalni pregled stranice — oponaša Vercel (cleanUrls + redirects iz vercel.json).
 *
 *   node build/serve.mjs
 *   → http://localhost:4173
 *
 * Potreban je jer stranica koristi rute bez .html nastavka (/wiki,
 * /rjesenja/solarne-elektrane). Otvaranje datoteka dvoklikom (file://)
 * ne radi jer preglednik tada nema server koji bi rutu preveo u datoteku.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT) || 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

/* preusmjeravanja iz vercel.json */
let redirects = [];
try {
  const cfg = JSON.parse(await readFile(join(ROOT, "vercel.json"), "utf8"));
  redirects = cfg.redirects || [];
} catch {}

const exists = async (p) => {
  try {
    const s = await stat(p);
    return s.isFile();
  } catch {
    return false;
  }
};

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let path = decodeURIComponent(url.pathname);

  const hit = redirects.find((r) => r.source === path);
  if (hit) {
    res.writeHead(hit.permanent ? 308 : 307, { Location: hit.destination });
    return res.end();
  }

  if (path.endsWith("/")) path = path.slice(0, -1);
  if (path === "") path = "/index";

  // cleanUrls: /wiki → wiki.html, /rjesenja/x → rjesenja/x.html
  const candidates = extname(path)
    ? [join(ROOT, path)]
    : [join(ROOT, `${path}.html`), join(ROOT, path, "index.html")];

  for (const file of candidates) {
    if (await exists(file)) {
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type": MIME[extname(file)] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      return res.end(body);
    }
  }

  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<h1>404</h1><p>Nema rute <code>${path}</code></p>`);
}).listen(PORT, () => {
  console.log(`Larsoon preview:  http://localhost:${PORT}`);
  console.log("Zaustavi s Ctrl+C");
});
