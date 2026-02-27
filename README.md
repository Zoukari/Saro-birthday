# 🎂 Joyeux Anniversaire Saro — Site React

Site d'anniversaire cinématique, auto-scroll 3:58, musique Taylor Swift.

## Structure des fichiers

```
saro-birthday/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src/
    ├── main.jsx              ← point d'entrée React
    ├── App.jsx               ← orchestration principale
    ├── index.css             ← styles globaux + animations
    │
    ├── data/
    │   ├── images.js         ← pool d'images (remplace par tes vraies photos!)
    │   ├── slides.js         ← 50 définitions de slides
    │   └── cardLayouts.js    ← 14 variantes de disposition de cartes
    │
    ├── hooks/
    │   ├── useAutoScroll.js  ← moteur d'animation 3:58 (rAF, pas de re-render)
    │   ├── useCursor.js      ← curseur custom avec lag
    │   └── useYouTube.js     ← lecteur YouTube (Taylor Swift - Lover)
    │
    └── components/
        ├── Loader.jsx        ← écran de chargement
        ├── AmbientFX.jsx     ← aurora, cœurs, sparkles, dot-grid, noise
        ├── SlideRenderer.jsx ← mappage type → composant
        ├── UI.jsx            ← barre de progression, nav dots, compteur, musique
        │
        └── slides/
            ├── SlideHero.jsx
            ├── SlideQuote.jsx
            ├── SlideDiag.jsx
            ├── SlideFullBleed.jsx
            ├── SlideFramed.jsx
            ├── SlideSplit.jsx
            ├── SlideCards.jsx
            └── SlideFinal.jsx
```

## Installation & démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement
npm run dev
# → http://localhost:3000

# 3. Build production
npm run build
npm run preview
```

## 📸 Remplacer les photos

Dans `src/data/images.js`, remplace les fonctions `np()`, `nl()`, `nq()` par tes vraies URLs :

```js
// Exemple avec tes propres photos
const PORTRAIT_PHOTOS = [
  '/photos/saro-01.jpg',
  '/photos/saro-02.jpg',
  // ...
]
```

Place tes photos dans `public/photos/`.

## 🎵 Musique

La musique utilise l'API YouTube IFrame.
Video ID actuel : `-BjZmE2gtdo` (Taylor Swift - Lover)
Pour changer : modifie `VIDEO_ID` dans `src/hooks/useYouTube.js`.

## ⌨️ Navigation

- **Flèches** ← → ↑ ↓ : changer de slide manuellement
- **Swipe** gauche/droite sur mobile
- **Points** à droite de l'écran : navigation directe
- **♫ bouton** en bas à droite : mute/unmute

## 🛠 Stack

- React 18 + Vite
- Tailwind CSS v3
- Framer Motion (optionnel — animations actuelles en CSS/rAF pur pour 60fps garanti)
- YouTube IFrame API pour la musique
