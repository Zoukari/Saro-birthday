// ─────────────────────────────────────────────────────────
// IMAGE POOL — picsum.photos with varied seeds
// Replace these URLs with your real photos before deploying
// ─────────────────────────────────────────────────────────

const PORT_SEEDS = [
  'amour','blossom','tender','silk','floral','iris','kira','mist','nara','opale',
  'petal','quiet','radiant','serene','truffle','union','veil','warmth','xyla','zara',
  'cerise','douceur','eden','fable','garnet','haven','ivory','jasper','karma','lune',
]
const LAND_SEEDS = [
  'beach','canyon','dusk','evening','forest','garden','horizon','island','jungle','lagoon',
  'meadow','nebula','ocean','palace','river','sunset','temple','valley','winter','zenith',
  'alpine','bloom','cloud','desert','ember','fjord','grace','heath','inlet','jasmine',
]
const SQ_SEEDS = [
  'sq01','sq02','sq03','sq04','sq05','sq06','sq07','sq08','sq09','sq10',
]

let pi = 0, li = 0, qi = 0

/** Portrait photo — 580×870 */
export const np = (w = 580, h = 870) =>
  `https://picsum.photos/seed/${PORT_SEEDS[pi++ % PORT_SEEDS.length]}/${w}/${h}`

/** Landscape photo — 1500×860 */
export const nl = (w = 1500, h = 860) =>
  `https://picsum.photos/seed/${LAND_SEEDS[li++ % LAND_SEEDS.length]}/${w}/${h}`

/** Square photo — 680×680 */
export const nq = (w = 680, h = 680) =>
  `https://picsum.photos/seed/${SQ_SEEDS[qi++ % SQ_SEEDS.length]}/${w}/${h}`

/** Collect all unique image URLs from a slides array */
export function collectImageUrls(slides) {
  const urls = []
  slides.forEach(s => {
    if (s.img)  urls.push(s.img)
    if (s.imgs) urls.push(...s.imgs)
  })
  return [...new Set(urls)]
}
