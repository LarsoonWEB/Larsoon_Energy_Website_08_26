# Deployment — Larsoon landing na Vercel + povezivanje Quote wizarda

## 0. Lokalni pregled — OBAVEZNO preko servera

Stranica koristi rute bez `.html` nastavka (`/wiki`, `/rjesenja/solarne-elektrane`).
Ako HTML datoteke otvoriš **dvoklikom**, poveznice neće raditi — preglednik tada
nema server koji rutu prevodi u datoteku, pa `/wiki` traži mapu umjesto `wiki.html`.

Pokreni lokalni server (bez ijedne vanjske ovisnosti):

```bash
node build/serve.mjs
```

Zatim otvori **http://localhost:4173**. Server oponaša Vercel: čiste rute i
preusmjeravanja iz `vercel.json`. Zaustavlja se s Ctrl+C.

Stranica je čisti statički site (HTML/CSS/JS, bez builda). `vercel.json` s
`cleanUrls` već je u repozitoriju, pa pravne rute (`/impressum`,
`/pravila-privatnosti`, `/kolacici`) rade bez ekstenzije odmah po deployu.
`.htaccess` je fallback za Apache (Plus hosting) — Vercel ga ignorira, ne smeta.

---

## 1. Deploy landinga

### Opcija A — preko GitHuba (preporučeno: svaki `git push` = novi deploy)

1. Napravi **privatni repozitorij** na GitHubu (npr. `larsoon-landing`), pa iz
   ove mape:

   ```bash
   git remote add origin https://github.com/<tvoj-account>/larsoon-landing.git
   git push -u origin main
   ```

2. Na [vercel.com/new](https://vercel.com/new) → **Import** repozitorija.
3. Postavke projekta:
   - **Framework Preset:** `Other`
   - **Build Command:** *(prazno)*
   - **Output Directory:** *(prazno — root)*
   - **Install Command:** *(prazno)*
4. **Deploy.** Dobivaš privremeni URL `larsoon-landing-*.vercel.app` za provjeru.

### Opcija B — Vercel CLI (bez GitHuba)

```bash
npm i -g vercel
vercel login
vercel --prod
```

(pokreće se iz ove mape; prvi put odgovori na pitanja kao u opciji A)

### Domena

Canonical i OG tagovi u `index.html` pokazuju na **`https://www.larsoon.com/`**
— dakle `www` je primarna, apex se preusmjerava.

1. U Vercel projektu: **Settings → Domains** → dodaj `www.larsoon.com` i
   `larsoon.com`; za `larsoon.com` odaberi **Redirect to www.larsoon.com**.
2. Kod registrara domene postavi DNS:

   | Tip   | Ime  | Vrijednost              |
   |-------|------|-------------------------|
   | A     | `@`  | `76.76.21.21`           |
   | CNAME | `www`| `cname.vercel-dns.com`  |

3. Pričekaj da Vercel izda SSL certifikat (obično par minuta).

### Odmah nakon deploya (checklist)

- [ ] `https://www.larsoon.com/impressum` radi bez `.html` (cleanUrls)
- [ ] **Kontakt forma:** pošalji prvu probnu poruku — FormSubmit će na
      `info@larsoon.com` poslati **jednokratni aktivacijski e-mail**; klikni
      potvrdu. Tek nakon toga poruke se isporučuju. Pošalji još jednu probu.
- [ ] Kalkulator: 6 kW bez baterije → 566 €/god, povrat 5,0
- [ ] Podijeli link u WhatsApp/LinkedIn — provjeri OG sliku i naslov
      (po potrebi [opengraph.xyz](https://www.opengraph.xyz) za pregled)
- [ ] Favicon vidljiv u tabu
- [ ] U `pravila-privatnosti.html` i `kolacici.html` zamijeni Wix reference
      stvarnim pružateljem (Vercel Inc.) prije objave
- [ ] Impressum: upiši direktora, IBAN i banku

---

## 2. Povezivanje Quote wizarda

Wizard je zasebna aplikacija (sada na localhostu) i deploya se kao **zaseban
Vercel projekt** na poddomeni — preporuka: **`ponuda.larsoon.com`**.

### 2a. Deploy wizarda

1. Wizard repo/mapa → novi Vercel projekt (framework prema tehnologiji wizarda,
   npr. Next.js se prepozna automatski).
2. **Settings → Domains** → dodaj `ponuda.larsoon.com`.
3. DNS kod registrara:

   | Tip   | Ime      | Vrijednost             |
   |-------|----------|------------------------|
   | CNAME | `ponuda` | `cname.vercel-dns.com` |

### 2b. Spoji landing na wizard — JEDNA linija

U [js/main.js](js/main.js) na vrhu:

```js
var WIZARD_URL = "https://ponuda.larsoon.com";
```

Svi gumbi "Izradi ponudu" (nav, hero, kalkulator, hodogram, završni CTA)
čitaju tu konstantu preko `data-wizard` atributa — ništa drugo ne treba dirati.
Commit + push = live.

Opcionalno, za praćenje izvora klikova:

```js
var WIZARD_URL = "https://ponuda.larsoon.com/?utm_source=landing";
```

### 2c. Poveznica natrag

U wizardu postavi logo/„Natrag" link na `https://www.larsoon.com/` i, ako
wizard ima vlastitu GDPR privolu, linkaj `https://www.larsoon.com/pravila-privatnosti`
(pravila već pokrivaju podatke iz upitnika — sekcija „Upitnik za izradu ponude").

---

## 3. Generatori stranica

Wiki članci i detaljne stranice Rješenja/Usluga generiraju se skriptama, pa se
predložak (nav, footer, meta, JSON-LD) mijenja na jednom mjestu:

```bash
node build/build-wiki.mjs    # content/wiki/*.mdx  →  wiki.html + wiki/*.html
node build/build-pages.mjs   # sadržaj u skripti   →  rjesenja/*.html, usluge/*.html
```

- **Novi wiki članak:** dodaj `.mdx` u `content/wiki/` (s frontmatterom
  `title, excerpt, category, readTime, publishedAt, author`) i pokreni prvu
  skriptu. Kategorije: `tehnicke-osnove`, `pravni-aspekti`,
  `financijski-aspekti`, `prakticni-savjeti`.
- **Izmjena teksta na stranici rješenja/usluge:** uredi konstantu `PAGES` u
  `build/build-pages.mjs` i pokreni drugu skriptu.
- Generirani `.html` se commita u repozitorij — Vercel ne pokreće build.
- `build/`, `content/` i `design-src/` isključeni su iz deploya
  preko `.vercelignore`.

## 4. Kasnije izmjene

- Sadržaj/stil: uredi datoteke → `git commit` → `git push` → Vercel automatski
  deploya (opcija A) ili `vercel --prod` (opcija B).
- FZOEU banner se uklanja brisanjem `<div class="banner" id="fzoeuBanner">…</div>`
  bloka u `index.html` (označen komentarom „privremeno").
