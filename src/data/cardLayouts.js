// ─────────────────────────────────────────────────────────
// CARD LAYOUT VARIANTS
// Each entry: { x, y, r(otation), s(cale), w(idth), h(eight), pol(aroid?) }
// x/y are % offsets from center (applied via left/top calc)
// ─────────────────────────────────────────────────────────

export const CARD_VARIANTS = {

  /** 3 cartes en éventail naturel */
  fan3: [
    { x: -33, y:  6, r: -13, s: .80, w: 222, h: 330 },
    { x:   0, y: -4, r:   0, s:  1,  w: 265, h: 375 },
    { x:  33, y:  7, r:  12, s: .78, w: 215, h: 322 },
  ],

  /** 4 polaroïds éparpillés */
  pol4: [
    { x: -42, y: -14, r: -16, s: .75, w: 162, h: 196, pol: true },
    { x: -12, y:  12, r:  -4, s: .90, w: 182, h: 222, pol: true },
    { x:  16, y: -10, r:   7, s: .86, w: 176, h: 214, pol: true },
    { x:  46, y:  14, r:  17, s: .73, w: 156, h: 190, pol: true },
  ],

  /** 5 cartes en cascade diagonale */
  stack5: [
    { x: -54, y:  18, r: -12, s: .67, w: 185, h: 275 },
    { x: -24, y:  -7, r:  -4, s: .83, w: 218, h: 314 },
    { x:   4, y:   5, r:   1, s:1.02, w: 258, h: 364 },
    { x:  30, y:  -7, r:   5, s: .81, w: 214, h: 308 },
    { x:  56, y:  16, r:  14, s: .65, w: 180, h: 265 },
  ],

  /** Ruban horizontal doux */
  rib3: [
    { x: -36, y:  2, r: -3, s: .88, w: 248, h: 352 },
    { x:   1, y: -7, r:  0, s:  1,  w: 275, h: 385 },
    { x:  37, y:  4, r:  2, s: .86, w: 242, h: 345 },
  ],

  /** 1 grande carte centrale + 2 satellites */
  hero1: [
    { x: -40, y: -18, r: -10, s: .61, w: 185, h: 268 },
    { x:   0, y:   0, r:   0, s:1.12, w: 295, h: 415 },
    { x:  42, y:  16, r:   7, s: .59, w: 175, h: 255 },
  ],

  /** Disposition en triangle */
  tri3: [
    { x: -30, y:  17, r:  -7, s: .84, w: 232, h: 330 },
    { x:   2, y: -16, r:   0, s: .96, w: 250, h: 355 },
    { x:  32, y:  14, r:   5, s: .82, w: 228, h: 325 },
  ],

  /** Cascade diagonale montante */
  cas4: [
    { x: -46, y:  22, r: -11, s: .73, w: 198, h: 286 },
    { x: -15, y:   4, r:  -3, s: .88, w: 235, h: 332 },
    { x:  15, y:  -8, r:   4, s: .96, w: 252, h: 355 },
    { x:  46, y: -18, r:  12, s: .76, w: 212, h: 305 },
  ],

  /** 3 colonnes portrait serrées */
  col3: [
    { x: -34, y:  0, r: -2, s: .90, w: 225, h: 372 },
    { x:   0, y:  5, r:  0, s:  1,  w: 245, h: 395 },
    { x:  34, y: -2, r:  1, s: .88, w: 220, h: 365 },
  ],

  /** 5 cartes vrac naturel */
  scatter5: [
    { x: -52, y: -17, r: -15, s: .65, w: 168, h: 248 },
    { x: -23, y:  13, r:  -5, s: .82, w: 209, h: 298 },
    { x:   4, y:  -5, r:   2, s:1.06, w: 265, h: 368 },
    { x:  31, y:  11, r:   8, s: .79, w: 204, h: 288 },
    { x:  58, y: -14, r: -13, s: .63, w: 162, h: 240 },
  ],

  /** Deck empilé — forte rotation */
  deck3: [
    { x: -3, y: -3, r: -21, s: .77, w: 245, h: 354 },
    { x:  2, y:  0, r:  -7, s: .88, w: 255, h: 366 },
    { x:  0, y:  2, r:   4, s: .97, w: 265, h: 379 },
  ],

  /** 4 cartes en orbite autour du centre */
  orbit4: [
    { x: -36, y: -20, r:  -8, s: .80, w: 195, h: 285 },
    { x:  36, y: -18, r:   6, s: .78, w: 189, h: 275 },
    { x: -32, y:  22, r:   7, s: .76, w: 185, h: 269 },
    { x:  34, y:  20, r:  -5, s: .82, w: 199, h: 288 },
  ],

  /** 4 cartes en ruban vertical */
  strip4: [
    { x: -48, y: -2, r: -2, s: .80, w: 188, h: 335 },
    { x: -16, y:  4, r: -1, s: .92, w: 215, h: 364 },
    { x:  16, y: -4, r:  1, s: .90, w: 209, h: 354 },
    { x:  48, y:  2, r:  2, s: .78, w: 183, h: 325 },
  ],

  /** 2 grandes cartes symétriques */
  pair2: [
    { x: -26, y: 0, r: -4, s: .95, w: 265, h: 392 },
    { x:  26, y: 0, r:  3, s: .93, w: 255, h: 382 },
  ],

  /** 1 seule grande carte centrée (zoom) */
  zoom1: [
    { x: 0, y: 0, r: 0, s: 1, w: 355, h: 515 },
  ],
}

/**
 * Merge layout template with actual images & labels
 * @param {string} variant - key of CARD_VARIANTS
 * @param {string[]} imgs   - image URLs
 * @param {string[]} lbls   - caption labels
 */
export function resolveCards(variant, imgs, lbls) {
  const tpl = CARD_VARIANTS[variant] ?? CARD_VARIANTS.fan3
  return tpl.map((d, i) => ({
    ...d,
    img: imgs[i % imgs.length],
    lbl: lbls[i % lbls.length],
  }))
}
