// ─────────────────────────────────────────────────────────
// 50 SLIDES — une image différente par slide (index unique, pas de répétition)
// Types: hero | quote | full | cards | diag | split | framed | final
// ─────────────────────────────────────────────────────────
import { photoUrl } from './images.js'

function imageCount(d) {
  if ('imgsCount' in d) return d.imgsCount
  if (d.img === true || d.imgSq === true) return 1
  return 0
}

function slide(i, data, imageStarts) {
  const needPortraits = 'imgsCount' in data
  const needSquare = 'imgSq' in data
  const needImg = 'img' in data && data.img === true
  const out = { ...data }
  delete out.imgsCount
  delete out.imgSq
  const start = imageStarts[i]
  if (needSquare || needImg) out.img = photoUrl(start)
  if (needPortraits) out.imgs = Array.from({ length: data.imgsCount }, (_, s) => photoUrl(start + s))
  return out
}

const T = [
  { t: 'hero' },
  { t: 'quote',  q: 'Chaque moment avec toi\nest un cadeau précieux.',       sub: '∞ · Pour toujours',        big: 'AMOUR' },
  { t: 'full',   img: true, cap: 'Le premier regard' },
  { t: 'cards',  v: 'fan3',    imgsCount: 3,   lbls: ['Souvenirs', 'Notre histoire', 'À jamais'] },
  { t: 'diag',   q: 'Tu illumines\nma vie.',                         sub: 'Lumière · Mon amour',    big: 'LUMIÈRE',   al: 'l' },
  { t: 'split',  img: true, q: 'Dans tes yeux je vois\ntout ce dont j\'ai besoin.', lbl: '01 — Regards',  sub: 'Pour l\'éternité',          rev: false },
  { t: 'framed', img: true, cap: 'Saro · Ma vie',                    w: 252, h: 355 },
  { t: 'quote',  q: 'Je t\'aime plus que\nles mots ne peuvent le dire.', sub: 'Avec tout mon être',     big: 'TOUJOURS' },
  { t: 'full',   img: true, cap: 'L\'amour en images' },
  { t: 'cards',  v: 'pol4',    imgsCount: 4,   lbls: ['Janvier', 'Été', 'Automne', 'Hiver'] },
  { t: 'diag',   q: 'Tu es\nma maison.',                             sub: 'Mon refuge · Mon soleil', big: 'MAISON',    al: 'r' },
  { t: 'split',  img: true, q: 'Chaque voyage est plus beau\nquand tu es à mes côtés.', lbl: '02 — Voyage', sub: 'Ma compagne de vie',     rev: true },
  { t: 'framed', imgSq: true, cap: 'Notre sourire · Notre force',      w: 310, h: 310 },
  { t: 'quote',  q: 'Tu mérites tout\nce que la vie a de plus beau.', sub: '· Avec amour ·',          big: 'GRÂCE' },
  { t: 'full',   img: true, cap: 'La beauté du temps' },
  { t: 'cards',  v: 'stack5',  imgsCount: 5, lbls: ['Paris', 'Venise', 'Santorini', 'Barcelone', 'Rome'] },
  { t: 'diag',   q: 'Ma future femme,\ntu es mon plus\nbeau rêve éveillé.', sub: 'Futur · Promesse',  big: 'AVENIR',    al: 'l' },
  { t: 'split',  img: true, q: 'Avec toi, chaque jour\nbrille d\'une lumière nouvelle.', lbl: '03 — Lumière', sub: 'Ma lumière dorée', rev: false },
  { t: 'framed', img: true, cap: 'Toujours · Ma chérie',             w: 235, h: 375 },
  { t: 'quote',  q: 'Ta grâce est la plus belle\ndes œuvres d\'art.', sub: 'Je t\'aime · Toujours' },
  { t: 'full',   img: true, cap: 'Les instants précieux' },
  { t: 'cards',  v: 'rib3',    imgsCount: 3,   lbls: ['Rires', 'Larmes', 'Victoires'] },
  { t: 'diag',   q: 'Chaque étoile\ndans le ciel\nte ressemble.',   sub: 'Mon étoile · Ma nuit',    big: 'ÉTOILES',   al: 'r' },
  { t: 'split',  img: true, q: 'Ton âme est si belle\nqu\'elle donne envie d\'être meilleur.', lbl: '04 — Âme', sub: 'À ton âme sœur', rev: true },
  { t: 'framed', img: true, cap: 'Notre promesse · 2024',            w: 250, h: 355 },
  { t: 'quote',  q: 'Tu es la raison\nde chacun de mes sourires.',  sub: 'Avec tendresse · Toujours' },
  { t: 'full',   img: true, cap: 'Sous les étoiles' },
  { t: 'cards',  v: 'hero1',   imgsCount: 3,   lbls: ['Mon amour', 'Douceur', 'Éternité'] },
  { t: 'diag',   q: 'Je promets de t\'aimer\nchaque jour\ndavantage.', sub: 'Ma promesse éternelle', big: 'PROMESSE', al: 'l' },
  { t: 'split',  img: true, q: 'Dans ta tendresse\nje trouve ma paix.', lbl: '05 — Tendresse', sub: 'Ma paix · Mon refuge', rev: false },
  { t: 'framed', imgSq: true, cap: 'Ma muse · Ma vie',                w: 295, h: 295 },
  { t: 'quote',  q: 'Je suis le plus chanceux\nde t\'avoir dans ma vie.', sub: 'Chanceux · Amoureux', big: 'CHANCE' },
  { t: 'full',   img: true, cap: 'Notre voyage' },
  { t: 'cards',  v: 'tri3',    imgsCount: 3,   lbls: ['Printemps', 'Été', 'Automne'] },
  { t: 'diag',   q: 'Tu es ma\nlumière dorée.',                     sub: 'Ma lumière · Mon soleil', big: 'SOLEIL',    al: 'r' },
  { t: 'split',  img: true, q: 'L\'amour que je ressens\npour toi n\'a pas de fin.', lbl: '06 — Éternité', sub: 'Infini · Éternel', rev: true },
  { t: 'framed', img: true, cap: 'Saro · Ma lumière',               w: 240, h: 372 },
  { t: 'quote',  q: 'Avec toi, chaque saison\nest la plus belle.',  sub: 'Nos saisons · Notre vie' },
  { t: 'full',   img: true, cap: 'La vie à deux' },
  { t: 'cards',  v: 'cas4',    imgsCount: 4,   lbls: ['Nos rires', 'Nos larmes', 'Nos victoires', 'Notre amour'] },
  { t: 'diag',   q: 'Joyeux anniversaire\nma chérie.',             sub: 'Avec tout mon amour',    big: 'CÉLÉBRATION', al: 'l' },
  { t: 'split',  img: true, q: 'Cette journée te célèbre,\ntoi qui es si précieuse.', lbl: '07 — Célébration', sub: 'Ta journée · Ton moment', rev: false },
  { t: 'framed', img: true, cap: 'Ensemble · Pour toujours',        w: 245, h: 375 },
  { t: 'quote',  q: 'Chaque instant avec toi\nest un trésor.',     sub: 'Nos trésors · Notre vie', big: 'TRÉSOR' },
  { t: 'full',   img: true, cap: 'Nos sourires · Nos âmes' },
  { t: 'cards',  v: 'orbit4',  imgsCount: 4,   lbls: ['Tendresse', 'Passion', 'Joie', 'Paix'] },
  { t: 'diag',   q: 'Tu illumines\nchaque pièce\nque tu traverses.', sub: 'Ma lumière',           big: 'ÉCLAT',     al: 'r' },
  { t: 'split',  img: true, q: 'Je promets de grandir\nà tes côtés chaque jour.', lbl: '08 — Avenir', sub: 'Notre avenir · Notre amour', rev: true },
  { t: 'quote',  q: 'Pour toi, mon amour,\ntoujours et encore.',   sub: '· À jamais ·',           big: 'SARO',      sh: true },
  { t: 'final' },
]

const imageStarts = []
let offset = 0
T.forEach(d => {
  imageStarts.push(offset)
  offset += imageCount(d)
})

export const SLIDES = T.map((d, i) => slide(i, d, imageStarts))
