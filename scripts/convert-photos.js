// ─────────────────────────────────────────────────────────
// Convertit HEIC → JPG et MOV → JPG (1 frame) dans public/photo-saro
// Usage: node scripts/convert-photos.js
// Nécessite: npm install (heic-convert), et ffmpeg dans le PATH pour les MOV
// ─────────────────────────────────────────────────────────
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PHOTO_DIR = path.join(__dirname, '..', 'public', 'photo-saro')
const IMAGES_JS = path.join(__dirname, '..', 'src', 'data', 'images.js')

async function convertHeic(inputPath) {
  const heicConvert = (await import('heic-convert')).default
  const input = fs.readFileSync(inputPath)
  const output = await heicConvert({ buffer: input, format: 'JPEG', quality: 0.92 })
  const outPath = inputPath.replace(/\.heic$/i, '.jpg')
  fs.writeFileSync(outPath, output)
  console.log('  ✓', path.basename(inputPath), '→', path.basename(outPath))
  return outPath
}

function convertMovToJpg(inputPath) {
  const outPath = inputPath.replace(/\.mov$/i, '.jpg')
  try {
    execSync(
      `ffmpeg -y -i "${inputPath}" -vframes 1 -q:v 2 "${outPath}"`,
      { stdio: 'pipe' }
    )
    console.log('  ✓', path.basename(inputPath), '→', path.basename(outPath))
    return outPath
  } catch (e) {
    console.warn('  ⚠ ffmpeg non disponible ou erreur:', path.basename(inputPath))
    return null
  }
}

function getAllImageFiles(dir) {
  const names = fs.readdirSync(dir)
  const filtered = names
    .filter(n => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(n))
    .filter(n => !/ 2\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(n)) // pas de doublon "xxx 2.jpg"
    .sort()
  return filtered
}

function updateImagesJs(imageFiles) {
  const list = imageFiles.map(f => `  '${f.replace(/'/g, "\\'")}'`).join(',\n')
  const content = `// ─────────────────────────────────────────────────────────
// Galerie : public/photo-saro — généré par node scripts/convert-photos.js
// ─────────────────────────────────────────────────────────

const PHOTO_SARO_FILES = [
${list}
]

const BASE = (import.meta.env.BASE_URL || '/').replace(/\\/$/, '') + '/photo-saro/'
const N = PHOTO_SARO_FILES.length

/** Index → URL ; utilisé par slides.js (imageStarts) */
export function photoUrl(index) {
  return BASE + encodeURIComponent(PHOTO_SARO_FILES[index % N])
}
export { N as PHOTO_COUNT }

export function collectImageUrls(slides) {
  const urls = []
  slides.forEach(s => {
    if (s.img) urls.push(s.img)
    if (s.imgs) urls.push(...s.imgs)
  })
  return [...new Set(urls)]
}

export function getAllPhotoSaroUrls() {
  return PHOTO_SARO_FILES.map(f => BASE + encodeURIComponent(f))
}
`
  fs.writeFileSync(IMAGES_JS, content, 'utf8')
  console.log('\n✓', IMAGES_JS, 'mis à jour avec', imageFiles.length, 'images.')
}

async function main() {
  if (!fs.existsSync(PHOTO_DIR)) {
    console.error('Dossier introuvable:', PHOTO_DIR)
    process.exit(1)
  }

  const files = fs.readdirSync(PHOTO_DIR)
  const heic = files.filter(f => /\.heic$/i.test(f))
  const mov = files.filter(f => /\.mov$/i.test(f))

  console.log('HEIC à convertir:', heic.length)
  console.log('MOV à convertir (1 frame JPG):', mov.length)

  for (const f of heic) {
    const p = path.join(PHOTO_DIR, f)
    try {
      await convertHeic(p)
    } catch (e) {
      console.warn('  ⚠ Erreur', f, e.message)
    }
  }

  for (const f of mov) {
    const p = path.join(PHOTO_DIR, f)
    convertMovToJpg(p)
  }

  const allImages = getAllImageFiles(PHOTO_DIR)
  updateImagesJs(allImages)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
