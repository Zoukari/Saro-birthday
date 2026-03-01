// ─────────────────────────────────────────────────────────
// 50 SLIDES — textes et contenus personnalisés (sans titres type AVENIR/PROMESSE)
// Types: hero | quote | full | cards | diag | split | framed | final
// ─────────────────────────────────────────────────────────
import { photoUrl, photoUrlByFile } from './images.js'

export const MEME_LINK = 'https://youtube.com/shorts/jqa6UT_AnhE?si=bY-F2SU0eckIEOHx'

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
  delete out.imgOverride
  const start = imageStarts[i]
  if (data.imgOverride) out.img = photoUrlByFile(data.imgOverride)
  else if (needSquare || needImg) out.img = photoUrl(start)
  if (needPortraits) out.imgs = Array.from({ length: data.imgsCount }, (_, s) => photoUrl(start + s))
  return out
}

const T = [
  { t: 'hero', heroText: 'Au happy 26 ans ma beauté' },
  { t: 'quote', q: 'Chaque moment avec toi\nest un cadeau précieux.', sub: '∞ · Pour toujours' },
  { t: 'full', img: true, cap: 'On est ensemble' },
  { t: 'cards', v: 'fan3', imgsCount: 3, lbls: ['Souvenirs', 'Notre histoire', 'À jamais'] },
  { t: 'diag', q: 'Tu illumines\nma vie.', sub: 'Lumière · Mon amour', al: 'l' },
  { t: 'split', img: true, q: 'Dans tes yeux je vois\ntout ce dont j\'ai besoin.', sub: 'Pour l\'éternité', rev: false },
  { t: 'framed', img: true, w: 252, h: 355, extra: 'Mashallah toujours happy avec ton beau sourire' },
  { t: 'quote', q: 'Je t\'aime plus que\nles mots ne peuvent le dire.', sub: 'Avec tout mon être' },
  { t: 'full', img: true, cap: 'L\'amour en images', arrowText: 'Tu as pris cette photo parce que t\'étais à côté de chez moi hihi' },
  { t: 'cards', v: 'pol4', imgsCount: 4, lbls: ['Janvier', 'Été', 'Automne', 'Hiver'], rounded: true, recap: 'Un récap de toute ta vie, et ton futur aussi peut-être hihi' },
  { t: 'diag', q: 'Tu es\nma maison.', sub: 'Mon refuge · Mon soleil', al: 'r' },
  { t: 'split', img: true, q: 'Regarde ma petite beauté.', sub: 'Ma compagne de vie', rev: true },
  { t: 'framed', imgSq: true, w: 310, h: 310, extra: 'Cette vidéo me rappelle un meme', memeLink: true },
  { t: 'quote', q: 'Tu mérites tout\nce que la vie a de plus beau.', sub: '· Avec amour ·', extra: 'Sorcière ou fée ???' },
  { t: 'full', img: true, cap: 'La beauté du temps' },
  { t: 'cards', v: 'stack5', imgsCount: 5, lbls: ['Paris', 'Venise', 'Santorini', 'Barcelone', 'Rome'] },
  { t: 'diag', q: 'Ma future femme,\ntu es mon plus\nbeau rêve éveillé.', sub: 'Futur · Promesse', al: 'l' },
  { t: 'split', img: true, q: 'Avec toi, chaque jour\nbrille d\'une lumière nouvelle.', sub: 'Ma lumière dorée', rev: false },
  { t: 'framed', img: true, w: 235, h: 375, imgOverride: '9ef6ed37-9a5a-404c-9abe-595171b71fa4.jpeg', extra: 'Sorcière ou fée ???' },
  { t: 'quote', q: 'Ta grâce est la plus belle\ndes œuvres d\'art.', sub: 'Je t\'aime · Toujours', extra: 'Ohlala quelle queen ma beauté' },
  { t: 'full', img: true, cap: 'Les instants précieux' },
  { t: 'cards', v: 'rib3', imgsCount: 3, lbls: ['Rires', 'Larmes', 'Victoires'] },
  { t: 'diag', q: 'Chaque étoile\ndans le ciel\nte ressemble.', sub: 'Mon étoile · Ma nuit', al: 'r', extra: 'J\'ai zoomé pour voir si t\'es vraiment queen, pas trop sérieuse mais t\'es la queen de mon cœur' },
  { t: 'split', img: true, q: 'Tu vois je le dis et je le redïs, t\'es ma queen.', sub: 'Ma compagne de vie', rev: true },
  { t: 'framed', img: true, w: 250, h: 355 },
  { t: 'quote', q: 'Tu es la raison\nde chacun de mes sourires.', sub: 'Avec tendresse · Toujours', extra: 'J\'avais faim trop faim wallah' },
  { t: 'full', img: true, cap: 'Sous les étoiles' },
  { t: 'cards', v: 'hero1', imgsCount: 3, lbls: ['Mon amour', 'Douceur', 'Éternité'] },
  { t: 'diag', q: 'Je promets de t\'aimer\nchaque jour\ndavantage.', sub: 'Ma promesse éternelle', al: 'l' },
  { t: 'split', img: true, q: 'Dans ta tendresse\nje trouve ma paix.', sub: 'Ma paix · Mon refuge', rev: false },
  { t: 'framed', imgSq: true, w: 295, h: 295 },
  { t: 'quote', q: 'Je suis le plus chanceux\nde t\'avoir dans ma vie.', sub: 'Chanceux · Amoureux' },
  { t: 'full', img: true, cap: 'Woooow' },
  { t: 'cards', v: 'tri3', imgsCount: 3, lbls: ['Printemps', 'Été', 'Automne'] },
  { t: 'diag', q: 'Tu es ma\nlumière dorée.', sub: 'Ma lumière · Mon soleil', al: 'r' },
  { t: 'split', img: true, q: 'L\'amour que je ressens\npour toi n\'a pas de fin.', sub: 'Infini · Éternel', rev: true },
  { t: 'framed', img: true, w: 240, h: 372, extra: 'Double wooooow (par contre le make up wakanda)' },
  { t: 'quote', q: 'Avec toi, chaque saison\nest la plus belle.', sub: 'Nos saisons · Notre vie' },
  { t: 'full', img: true, cap: 'La vie à deux' },
  { t: 'cards', v: 'cas4', imgsCount: 4, lbls: ['Nos rires', 'Nos larmes', 'Nos victoires', 'Notre amour'] },
  { t: 'diag', q: 'Joyeux anniversaire\nma chérie.', sub: 'Avec tout mon amour', al: 'l' },
  { t: 'split', img: true, q: 'Cette journée te célèbre,\ntoi qui es si précieuse.', sub: 'Ta journée · Ton moment', rev: false },
  { t: 'framed', img: true, w: 245, h: 375, extra: 'Meilleure soirée passée avec toi, hâte d\'en passer d\'autres' },
  { t: 'quote', q: 'Chaque instant avec toi\nest un trésor.', sub: 'Nos trésors · Notre vie' },
  { t: 'full', img: true, cap: 'Ah waiii gang hein' },
  { t: 'cards', v: 'orbit4', imgsCount: 4, lbls: ['Tendresse', 'Passion', 'Joie', 'Paix'] },
  { t: 'diag', q: 'Tu illumines\nchaque pièce\nque tu traverses.', sub: 'Ma lumière', al: 'r', extra: 'Triple woooow' },
  { t: 'split', img: true, q: 'L\'amour que je ressens\npour toi n\'a pas de fin.\nBusinesswaman.', sub: 'Infini · Éternel', rev: true, photoCaption: 'Je me dédicace quand même pour le site, contactez moi au 25377141498' },
  { t: 'framed', img: true, w: 245, h: 375, extra: 'Ah wai ça mange hein' },
  { t: 'quote', q: 'Avec toi, chaque saison\nest la plus belle.', sub: 'Par contre là tu me fais peur', extra: 'Voir la prochaine slide' },
  { t: 'full', img: true, cap: 'Ah wai j\'ai peur' },
  { t: 'cards', v: 'orbit4', imgsCount: 4, lbls: ['Tendresse', 'Passion', 'Joie', 'Paix'] },
  { t: 'diag', q: 'Tu illumines\nchaque pièce\nque tu traverses.', sub: 'Ma lumière', al: 'r' },
  { t: 'split', img: true, q: 'Je promets de grandir\nà tes côtés chaque jour.', sub: 'Notre avenir · Notre amour', rev: true, extra: 'Saha tu me prends pas en photo tu prends en photo la voiture' },
  { t: 'quote', q: 'Pour toi, mon amour,\ntoujours et encore.', sub: '· À jamais ·', sh: true },
  { t: 'final' },
]

const imageStarts = []
let offset = 0
T.forEach(d => {
  imageStarts.push(offset)
  offset += imageCount(d)
})

export const SLIDES = T.map((d, i) => slide(i, d, imageStarts))
