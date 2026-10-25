// 2.3 · Responsive slike: iz assets/*.jpg generira assets/img/<ime>-<w>.{avif,webp}
// za širine 480/800/1200/1600 (nikad veće od izvornika). Pokreni: npm run images
// Izvornici ostaju kao fallback u <img src>. og-* slika se preskače (meta tag, ne srcset).
import sharp from 'sharp'
import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'assets'
const OUT = 'assets/img'
const WIDTHS = [480, 800, 1200, 1600]

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter(f => /\.jpe?g$/i.test(f) && !f.startsWith('og-'))
const manifest = {}
for (const f of files) {
  const name = f.replace(/\.jpe?g$/i, '')
  const input = sharp(path.join(SRC, f)).rotate()
  const { width, height } = await input.metadata()
  const widths = WIDTHS.filter(w => w < width)
  if (!widths.includes(width)) widths.push(width) // izvorna širina kao najveća
  manifest[name] = { width, height, widths }
  for (const w of widths) {
    const base = `${OUT}/${name}-${w}`
    await input.clone().resize({ width: w }).avif({ quality: 55, effort: 4 }).toFile(`${base}.avif`)
    await input.clone().resize({ width: w }).webp({ quality: 78 }).toFile(`${base}.webp`)
  }
  const sizes = await Promise.all(widths.map(async w => `${w}:${Math.round((await stat(`${OUT}/${name}-${w}.avif`)).size / 1024)}k/${Math.round((await stat(`${OUT}/${name}-${w}.webp`)).size / 1024)}k`))
  console.log(`${f} ${width}×${height} → ${sizes.join(' ')}`)
}
await (await import('node:fs/promises')).writeFile(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2))
