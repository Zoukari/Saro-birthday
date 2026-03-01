// ─────────────────────────────────────────────────────────
// 50 SLIDES — une image différente par slide (index unique)
// Types: hero | quote | full | cards | diag | split | framed | final
// ─────────────────────────────────────────────────────────
import { photoUrl } from './images.js'

function imageCount(d) {
  if ('imgsCount' in d) return d.imgsCount
  if (d.img === true || d.imgSq === true) return 1
  return 0
}

const T = [
  { t: 'hero', heroSubtitle: 'Joyeux 26 ans ma beauté' },
  { t: 'quote',  q: 'Chaque moment avec toi\nest un cadeau précieux.',       sub: '∞ · Pour toujours' },
  { t: 'full',   img: true, cap: 'On est ensemble' },
  { t: 'cards',  v: 'fan3',    imgsCount: 3,   lbls: ['Souvenirs', 'Notre histoire', 'À jamais'] },
  { t: 'diag',   q: 'Tu illumines\nma vie.',                         sub: 'Lumière · Mon amour',    al: 'l' },
  { t: 'split',  img: true, q: 'Dans tes yeux je vois\ntout ce dont j\'ai besoin.', lbl: '01 — Regards',  sub: 'Pour l\'éternité',          rev: false },
  { t: 'framed', img: true, cap: 'Mashallah toujours happy avec ton beau sourire',                    w: 252, h: 355 },
  { t: 'quote',  q: 'Je t\'aime plus que\nles mots ne peuvent le dire.', sub: 'Avec tout mon être' },
  { t: 'full',   img: true, cap: 'L\'amour en images', arrow: 'Tu as pris cette photo parce que t\'étais à côté de chez moi hihi' },
  { t: 'cards',  v: 'pol4',    imgsCount: 4,   lbls: ['Janvier', 'Été', 'Automne', 'Hiver'], recap: 'Récap de toute ta vie et ton futur aussi peut-être hihi', rounded: true },
  { t: 'diag',   q: 'Tu es\nma maison.',                             sub: 'Mon refuge · Mon soleil', al: 'r' },
  { t: 'split',  img: true, q: 'Regarde ma petite beauté.', lbl: '02', sub: 'Ma compagne de vie',     rev: true },
  { t: 'framed', img: true, cap: 'Cette vidéo me rappelle un meme', linkMeme: true, w: 310, h: 310 },
  { t: 'quote',  q: 'Tu mérites tout\nce que la vie a de plus beau.', sub: '· Avec amour ·' },
  { t: 'full',   img: true, cap: 'Sorcière ou fée ???' },
  { t: 'cards',  v: 'scatter5', imgsCount: 5, lbls: ['Paris', 'Venise', 'Santorini', 'Barcelone', 'Rome'] },
  { t: 'diag',   q: 'Ma future femme,\ntu es mon plus\nbeau rêve éveillé.', sub: 'Futur · Promesse',  al: 'l' },
  { t: 'split',  img: true, forceImg: 18, q: 'Avec toi, chaque jour\nbrille d\'une lumière nouvelle.', lbl: '03 — Lumière', sub: 'Ma lumière dorée', rev: false },
  { t: 'framed', img: true, cap: 'Ohlala quelle queen ma beauté',             w: 235, h: 375 },
  { t: 'quote',  q: 'Ta grâce est la plus belle\ndes œuvres d\'art.', sub: 'Je t\'aime · Toujours' },
  { t: 'full',   img: true, cap: 'J\'ai zoomé pour voir si t\'es vraiment queen, pas trop sérieuse mais t\'es la queen de mon cœur' },
  { t: 'cards',  v: 'rib3',    imgsCount: 3,   lbls: ['Rires', 'Larmes', 'Victoires'], overlay: 'Tu vois je le dis et je le redis, t\'es ma queen' },
  { t: 'diag',   q: 'Chaque étoile\ndans le ciel\nte ressemble.',   sub: 'Mon étoile · Ma nuit',    al: 'r', topCaption: 'Tu vois je le dis et je le redis, t\'es ma queen' },
  { t: 'split',  img: true, q: 'Ton âme est si belle\nqu\'elle donne envie d\'être meilleur.\n\nJ\'avais faim, trop faim wallah.', lbl: '04 — Âme', sub: 'À ton âme sœur', rev: true },
  { t: 'framed', img: true, cap: 'Woooow',            w: 250, h: 355 },
  { t: 'quote',  q: 'Tu es la raison\nde chacun de mes sourires.\n\nWoooow',  sub: 'Avec tendresse · Toujours' },
  { t: 'full',   img: true, cap: 'Double wooooow (par contre le make-up Wakanda)' },
  { t: 'cards',  v: 'hero1',   imgsCount: 3,   lbls: ['Mon amour', 'Douceur', 'Éternité'], overlay: 'Meilleure soirée passée avec toi, hâte d\'en passer d\'autres' },
  { t: 'diag',   q: 'Je promets de t\'aimer\nchaque jour\ndavantage.', sub: 'Ma promesse éternelle', al: 'l' },
  { t: 'split',  img: true, q: 'Dans ta tendresse\nje trouve ma paix.', lbl: '05 — Tendresse', sub: 'Ma paix · Mon refuge', rev: false },
  { t: 'framed', imgSq: true, cap: 'Ah waiii gang hein',             w: 295, h: 295 },
  { t: 'quote',  q: 'Je suis le plus chanceux\nde t\'avoir dans ma vie.', sub: 'Chanceux · Amoureux' },
  { t: 'full',   img: true, cap: 'Triple woooow' },
  { t: 'cards',  v: 'tri3',    imgsCount: 3,   lbls: ['Printemps', 'Été', 'Automne'], topCaption: 'Je me dédicace quand même pour le site, contactez-moi au 25377141498' },
  { t: 'diag',   q: 'Tu es ma\nlumière dorée.',                     sub: 'Ma lumière · Mon soleil', al: 'r' },
  { t: 'split',  img: true, q: 'L\'amour que je ressens\npour toi n\'a pas de fin.\n\nBusinesswoman.', lbl: '06 — Éternité', sub: 'Infini · Éternel', rev: true },
  { t: 'framed', img: true, cap: 'Ah wai ça mange hein',               w: 240, h: 372 },
  { t: 'quote',  q: 'Avec toi, chaque saison\nest la plus belle.\n\nPar contre là tu me fais peur… Voir la prochaine slide.', sub: 'Nos saisons · Notre vie' },
  { t: 'full',   img: true, cap: 'Ah wai j\'ai peur' },
  { t: 'cards',  v: 'strip4',  imgsCount: 4,   lbls: ['Nos rires', 'Nos larmes', 'Nos victoires', 'Notre amour'] },
  { t: 'diag',   q: 'Joyeux anniversaire\nma chérie.',             sub: 'Avec tout mon amour',    al: 'l' },
  { t: 'split',  img: true, q: 'Cette journée te célèbre,\ntoi qui es si précieuse.', lbl: '07 — Célébration', sub: 'Ta journée · Ton moment', rev: false },
  { t: 'framed', img: true, cap: 'Saha tu me prends pas en photo, tu prends en photo la voiture', w: 245, h: 375 },
  { t: 'quote',  q: 'Chaque instant avec toi\nest un trésor.',     sub: 'Nos trésors · Notre vie' },
  { t: 'full',   img: true, cap: 'Nos sourires · Nos âmes' },
  { t: 'cards',  v: 'orbit4',  imgsCount: 4,   lbls: ['Tendresse', 'Passion', 'Joie', 'Paix'] },
  { t: 'diag',   q: 'Tu illumines\nchaque pièce\nque tu traverses.', sub: 'Ma lumière',           al: 'r' },
  { t: 'split',  img: true, q: 'Je promets de grandir\nà tes côtés chaque jour.', lbl: '08 — Avenir', sub: 'Notre avenir · Notre amour', rev: true },
  { t: 'quote',  q: 'Pour toi, mon amour,\ntoujours et encore.',   sub: '· À jamais ·',           sh: true },
  { t: 'final' },
]

const imageStarts = []
let offset = 0
T.forEach((d, i) => {
  imageStarts.push(offset)
  if (d.forceImg !== undefined) {
    offset += 1
  } else {
    offset += imageCount(d)
  }
})

function slideFinal(i, data, imageStarts) {
  const needPortraits = 'imgsCount' in data
  const needSquare = 'imgSq' in data
  const needImg = 'img' in data && data.img === true
  const out = { ...data }
  delete out.imgsCount
  delete out.imgSq
  const start = imageStarts[i]
  if (out.forceImg !== undefined) {
    out.img = photoUrl(out.forceImg)
    delete out.forceImg
  } else if (needSquare || needImg) {
    out.img = photoUrl(start)
  }
  if (needPortraits) out.imgs = Array.from({ length: data.imgsCount }, (_, s) => photoUrl(start + s))
  return out
}

export const SLIDES = T.map((d, i) => slideFinal(i, d, imageStarts))
