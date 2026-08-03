/**
 * Generator wiki stranica.
 *
 *   node build/build-wiki.mjs
 *
 * Čita content/wiki/*.mdx (frontmatter + markdown) i piše:
 *   wiki/<slug>.html   — pojedini članak sa sadržajem sa strane
 *   wiki.html          — indeks s pretragom i filtrom po kategoriji
 *
 * Pokreni ponovno nakon svake izmjene ili dodavanja članka.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "content", "wiki");
const OUT = join(ROOT, "wiki");

const CATEGORIES = {
  "tehnicke-osnove": { label: "Tehničke osnove", tint: "cyan" },
  "pravni-aspekti": { label: "Pravni aspekti", tint: "indigo" },
  "financijski-aspekti": { label: "Financijski aspekti", tint: "savings" },
  "prakticni-savjeti": { label: "Praktični savjeti", tint: "solar" },
};

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- frontmatter ---------- */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error("nedostaje frontmatter");
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, "");
  }
  return { meta, body: m[2] };
}

/* ---------- inline markdown ---------- */
function inline(t) {
  return esc(t)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

const slugifyHeading = (t) =>
  t
    .toLowerCase()
    .replace(/[čć]/g, "c").replace(/š/g, "s").replace(/ž/g, "z").replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/* ---------- block markdown ---------- */
function renderBody(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  const toc = [];
  let i = 0;

  const flushParagraph = (buf) => {
    if (buf.length) out.push(`<p>${inline(buf.join(" "))}</p>`);
    buf.length = 0;
  };
  const para = [];

  while (i < lines.length) {
    const line = lines[i];

    // naslov
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      flushParagraph(para);
      const level = h[1].length;
      const text = h[2].trim();
      const id = slugifyHeading(text);
      if (level === 2) toc.push({ id, text });
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i++;
      continue;
    }

    // tablica
    if (/^\|/.test(line) && /^\|[\s:|-]+\|$/.test(lines[i + 1] || "")) {
      flushParagraph(para);
      const cells = (r) => r.split("|").slice(1, -1).map((c) => inline(c.trim()));
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        `<div class="prose__table"><table><thead><tr>${head
          .map((c) => `<th>${c}</th>`)
          .join("")}</tr></thead><tbody>${rows
          .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`
      );
      continue;
    }

    // citat
    if (/^>\s?/.test(line)) {
      flushParagraph(para);
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }

    // liste
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      flushParagraph(para);
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items = [];
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]))) {
        items.push(lines[i++].replace(/^\s*(?:[-*]|\d+\.)\s+/, ""));
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.map((it) => `<li>${inline(it)}</li>`).join("")}</${tag}>`);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph(para);
      i++;
      continue;
    }

    para.push(line.trim());
    i++;
  }
  flushParagraph(para);
  return { html: out.join("\n      "), toc };
}

/* ---------- zajednički dijelovi stranice ---------- */
const head = ({ title, description, canonical, depth }) => {
  const up = "../".repeat(depth);
  return `<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="https://www.larsoon.com${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="https://www.larsoon.com/assets/og-larsoon-solarna-elektrana.jpg">
<meta property="og:locale" content="hr_HR">
<link rel="icon" type="image/png" href="${up}assets/favicon.png">
<link rel="apple-touch-icon" href="${up}assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}css/tokens.css">
<link rel="stylesheet" href="${up}css/main.css">
</head>
<body>

<a class="skip-link" href="#glavni">Preskoči na sadržaj</a>
`;
};

const nav = (depth) => {
  const up = "../".repeat(depth);
  return `<header class="nav">
  <div class="nav__inner">
    <a href="${up}" aria-label="Larsoon — početna"><img src="${up}assets/larsoon-logo-light.png" alt="Larsoon" class="nav__logo"></a>
    <nav class="nav__links" aria-label="Glavna navigacija">
      <a href="${up}#kalkulator">Ušteda</a>
      <a href="${up}#zasto">Zašto Larsoon</a>
      <a href="${up}#kako">Kako funkcionira</a>
      <a href="${up}#rjesenja">Rješenja</a>
      <a href="${up}wiki">Wiki</a>
      <a href="${up}#kontakt">Kontakt</a>
    </nav>
    <div class="nav__actions">
      <a href="#" class="btn btn--primary btn--sm" data-wizard>Izradi ponudu</a>
      <button class="nav__menu-btn" type="button" id="menuBtn" aria-label="Izbornik" aria-expanded="false" aria-controls="mobileNav">
        <i data-lucide="menu"></i>
      </button>
    </div>
  </div>
  <nav class="nav__mobile" id="mobileNav" aria-label="Mobilna navigacija">
    <a href="${up}#kalkulator">Ušteda</a>
    <a href="${up}#zasto">Zašto Larsoon</a>
    <a href="${up}#kako">Kako funkcionira</a>
    <a href="${up}#rjesenja">Rješenja</a>
    <a href="${up}wiki">Wiki</a>
    <a href="${up}#kontakt">Kontakt</a>
  </nav>
</header>
`;
};

const footer = (depth) => {
  const up = "../".repeat(depth);
  return `<footer class="footer">
  <div class="footer__grid">
    <div>
      <img src="${up}assets/larsoon-logo-stacked.png" alt="Larsoon" class="footer__logo">
      <p class="footer__about">Larsoon Energy d.o.o. — projektiranje, prodaja i ugradnja solarnih elektrana, baterijskih sustava i EV punjača.<br>info@larsoon.com · +385 99 249 5949<br>Trg Ljube Babića 28, 10450 Jastrebarsko<br>OIB: 59474815786</p>
    </div>
    <div>
      <div class="footer__col-title">Rješenja</div>
      <ul>
        <li><a href="${up}rjesenja/solarne-elektrane">Solarne elektrane</a></li>
        <li><a href="${up}rjesenja/baterijski-sustavi">Baterijski sustavi</a></li>
        <li><a href="${up}rjesenja/punjaci-ev">Punjači za EV</a></li>
      </ul>
    </div>
    <div>
      <div class="footer__col-title">Usluge</div>
      <ul>
        <li><a href="${up}usluge/projektiranje">Projektiranje</a></li>
        <li><a href="${up}usluge/montaza">Montaža</a></li>
        <li><a href="${up}usluge/nadzor-i-odrzavanje">Nadzor i održavanje</a></li>
      </ul>
    </div>
    <div>
      <div class="footer__col-title">Tvrtka</div>
      <ul>
        <li><a href="${up}wiki">Wiki</a></li>
        <li><a href="${up}#radovi">Radovi</a></li>
        <li><a href="${up}#kontakt">Kontakt</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="footer__bottom-inner">
      <span>© 2026 Larsoon Energy d.o.o.</span>
      <span class="footer__legal">
        <a href="${up}pravila-privatnosti">Pravila privatnosti</a>
        <a href="${up}kolacici">Kolačići</a>
        <a href="${up}impressum">Impressum</a>
      </span>
    </div>
  </div>
</footer>

<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js" defer></script>
<script src="${up}js/main.js" defer></script>
</body>
</html>
`;
};

/* ---------- učitaj članke ---------- */
mkdirSync(OUT, { recursive: true });
const articles = readdirSync(SRC)
  .filter((f) => f.endsWith(".mdx"))
  .map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const { meta, body } = parseFrontmatter(readFileSync(join(SRC, file), "utf8"));
    const { html, toc } = renderBody(body);
    const cat = CATEGORIES[meta.category] || { label: meta.category, tint: "cyan" };
    return { slug, meta, html, toc, cat };
  })
  .sort((a, b) => (a.meta.publishedAt < b.meta.publishedAt ? 1 : -1));

/* ---------- stranice članaka ---------- */
for (const a of articles) {
  // uvijek 3 povezana članka: prvo ista kategorija, zatim najnoviji ostali
  const sameCat = articles.filter((r) => r.slug !== a.slug && r.meta.category === a.meta.category);
  const others = articles.filter((r) => r.slug !== a.slug && r.meta.category !== a.meta.category);
  const rel = sameCat.concat(others).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.meta.title,
    description: a.meta.excerpt,
    datePublished: a.meta.publishedAt,
    author: { "@type": "Organization", name: "Larsoon Energy d.o.o." },
    publisher: {
      "@type": "Organization",
      name: "Larsoon Energy d.o.o.",
      logo: { "@type": "ImageObject", url: "https://www.larsoon.com/assets/favicon.png" },
    },
    mainEntityOfPage: `https://www.larsoon.com/wiki/${a.slug}`,
  };

  const page = `${head({
    title: `${a.meta.title} | Larsoon Wiki`,
    description: a.meta.excerpt,
    canonical: `/wiki/${a.slug}`,
    depth: 1,
  })}<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
${nav(1)}
<main id="glavni" class="article">
  <div class="article__head">
    <nav class="crumbs" aria-label="Putanja"><a href="../">Početna</a> <span>/</span> <a href="../wiki">Wiki</a> <span>/</span> <span aria-current="page">${esc(a.meta.title)}</span></nav>
    <span class="wiki-cat wiki-cat--${a.cat.tint}">${esc(a.cat.label)}</span>
    <h1>${esc(a.meta.title)}</h1>
    <p class="article__excerpt">${esc(a.meta.excerpt)}</p>
    <div class="article__meta">
      <span><i data-lucide="clock"></i> ${esc(a.meta.readTime)} čitanja</span>
      <span><i data-lucide="calendar"></i> ${new Date(a.meta.publishedAt).toLocaleDateString("hr-HR", { day: "numeric", month: "long", year: "numeric" })}</span>
      <span><i data-lucide="user"></i> ${esc(a.meta.author)}</span>
    </div>
  </div>

  <div class="article__body">
    <aside class="toc" aria-label="Sadržaj članka">
      <div class="toc__title">Sadržaj</div>
      <ul>
${a.toc.map((t) => `        <li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("\n")}
      </ul>
    </aside>

    <article class="prose">
      ${a.html}

      <div class="prose__cta">
        <h3>Izračunajte uštedu za svoj krov</h3>
        <p>Personalizirana ponuda s izračunom investicije, poticaja i povrata stiže na vaš e-mail za 10 minuta.</p>
        <a href="#" class="btn btn--primary btn--md" data-wizard>Izradi ponudu <i data-lucide="arrow-right"></i></a>
      </div>
    </article>
  </div>

  <div class="article__related">
    <h2>Povezani članci</h2>
    <div class="wiki-grid">
${rel
  .map(
    (r) => `      <a class="wiki-card" href="${r.slug}">
        <span class="wiki-cat wiki-cat--${r.cat.tint}">${esc(r.cat.label)}</span>
        <h3>${esc(r.meta.title)}</h3>
        <p>${esc(r.meta.excerpt)}</p>
        <span class="wiki-card__more">Pročitajte više <i data-lucide="arrow-right"></i></span>
      </a>`
  )
  .join("\n")}
    </div>
  </div>
</main>

${footer(1)}`;

  writeFileSync(join(OUT, `${a.slug}.html`), page, "utf8");
}

/* ---------- indeks ---------- */
const catCounts = {};
for (const a of articles) catCounts[a.meta.category] = (catCounts[a.meta.category] || 0) + 1;

const indexPage = `${head({
  title: "Wiki — sve o solarnim elektranama | Larsoon",
  description:
    "Baza znanja o solarnim elektranama u Hrvatskoj: tehničke osnove, pravni okvir, isplativost i praktični savjeti. Bez marketinga, samo činjenice.",
  canonical: "/wiki",
  depth: 0,
})}${nav(0)}
<main id="glavni" class="section">
  <div class="section__inner">
    <div class="section-header section-header--center">
      <span class="eyebrow">Baza znanja</span>
      <h2>Sve o solarnim elektranama, na jednom mjestu</h2>
      <p class="lead">Tehnika, propisi, novac i praksa — objašnjeno jednostavno, s brojkama koje vrijede za Hrvatsku.</p>
    </div>

    <div class="wiki-tools">
      <div class="wiki-search">
        <i data-lucide="search"></i>
        <input type="search" id="wikiSearch" placeholder="Pretražite članke…" aria-label="Pretražite članke">
      </div>
      <div class="wiki-filters" role="group" aria-label="Filtriraj po kategoriji">
        <button type="button" class="wiki-filter is-active" data-cat="all">Sve <span>${articles.length}</span></button>
${Object.entries(CATEGORIES)
  .filter(([key]) => catCounts[key])
  .map(
    ([key, c]) =>
      `        <button type="button" class="wiki-filter" data-cat="${key}">${esc(c.label)} <span>${catCounts[key]}</span></button>`
  )
  .join("\n")}
      </div>
    </div>

    <div class="wiki-grid" id="wikiGrid">
${articles
  .map(
    (a) => `      <a class="wiki-card" href="wiki/${a.slug}" data-cat="${a.meta.category}" data-search="${esc(
      (a.meta.title + " " + a.meta.excerpt + " " + a.cat.label).toLowerCase()
    )}">
        <span class="wiki-cat wiki-cat--${a.cat.tint}">${esc(a.cat.label)}</span>
        <h3>${esc(a.meta.title)}</h3>
        <p>${esc(a.meta.excerpt)}</p>
        <span class="wiki-card__more">${esc(a.meta.readTime)} čitanja <i data-lucide="arrow-right"></i></span>
      </a>`
  )
  .join("\n")}
    </div>
    <p class="wiki-empty" id="wikiEmpty" hidden>Nema članaka za taj pojam. Pokušajte s drugom riječi ili <a href="#kontakt">nam pišite</a>.</p>
  </div>
</main>

${footer(0)}`;

writeFileSync(join(ROOT, "wiki.html"), indexPage, "utf8");

console.log(`Generirano: ${articles.length} članaka + wiki.html`);
for (const a of articles) console.log(`  /wiki/${a.slug}  (${a.toc.length} naslova)`);
