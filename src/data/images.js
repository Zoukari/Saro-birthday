// ─────────────────────────────────────────────────────────
// Galerie : public/photo-saro — généré par node scripts/convert-photos.js
// ─────────────────────────────────────────────────────────

const PHOTO_SARO_FILES = [
  '0143b32a-d36c-48f7-969d-ca24ccb9fa42.JPG',
  '0a8f078e-694c-439f-bf43-e95e2b4645a7.jpeg',
  '11e2b62c-5e41-4ebf-a27f-53ecddf12d95.jpeg',
  '15380139-afda-4807-95e6-6c9e0978cda1.jpeg',
  '1a95e698-9cb6-4941-902f-9c1c058b2e7a.jpeg',
  '1fa750b5-94ac-48d4-82dc-a30a0f004788.jpeg',
  '28e8c1c2-aa3a-489a-b903-29436b25db82.JPG',
  '2bd559e7-0a87-4906-87fc-89086197a7d2.jpeg',
  '2ce15113-5061-41eb-b972-e1e21d0314f2.jpeg',
  '4900810b-5138-4fbe-8c9a-6bba355929c1.JPG',
  '53ddec30-79d7-40d4-8b51-584434981cf6.JPG',
  '5bdbfb78-ccd9-44f0-a66f-1b96a1a2401b.jpeg',
  '6ed437c0-5b03-4685-8c2b-a5e1b013c3ba.jpeg',
  '8c49d815-80f5-496f-b546-b6729b364609.jpeg',
  '92fa8cc4-62a9-4290-9cee-226f8bece67e.jpeg',
  '96cdd09e-3919-4315-a2ce-d011587704e9.JPG',
  '9cd79e40-18a8-4b96-8c9a-8c182d1d7fc1.JPG',
  '9ef6ed37-9a5a-404c-9abe-595171b71fa4.jpeg',
  'IMG_0224.jpg',
  'IMG_0225.jpg',
  'IMG_0226.jpg',
  'IMG_0227.jpg',
  'IMG_0228.jpg',
  'IMG_0229.jpg',
  'IMG_0230.jpg',
  'IMG_0233.jpg',
  'IMG_0618.PNG',
  'IMG_7913.PNG',
  'IMG_8075.jpg',
  'IMG_8076.jpg',
  'IMG_8077.jpg',
  'IMG_8078.jpg',
  'IMG_8210.jpg',
  'IMG_8279.jpg',
  'IMG_8280.JPG',
  'IMG_8285.JPG',
  'IMG_8504.jpg',
  'IMG_8507.jpg',
  'IMG_8593.JPG',
  'IMG_8594.JPG',
  'IMG_8806.jpg',
  'IMG_9044.JPG',
  'IMG_9078.PNG',
  'IMG_9321.jpg',
  'IMG_9322.jpg',
  'IMG_9323.jpg',
  'IMG_9429.PNG',
  'IMG_9431.PNG',
  'IMG_9432.PNG',
  'a74f69c9-9875-40ad-b19e-d9efa93ff511.jpeg',
  'd1136b81-e105-4f1b-904f-a0799726a2f4.JPG',
  'd41a1272-f4de-4cf0-b28d-255f8eadd1f6.jpeg',
  'da60cce8-0326-43e8-88da-da2103d4b591.jpeg',
  'e3fb2501-423a-4148-ab6d-e6eed4401817.JPG',
  'eb184dcb-a896-469e-bff0-39f476f1b593.jpeg',
  'eedfd60a-356f-4217-b2aa-50761a85e12d.jpeg',
  'f2faa213-0c92-4fe3-8c3a-a365ab1aecf7.JPG',
  'fa470776-1950-4d39-94c0-0f8d7c742ea9.jpeg',
  'fbbbd63a-ee0b-418f-a4b0-d4bcf3bfc5e9.JPG',
  'fe8ea97f-7ed0-4f76-8aac-739bdbd71e8a.jpeg',
  'ff0d11cb-28d4-4777-b1f6-5b9a05153a03.jpeg'
]

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/photo-saro/'
const N = PHOTO_SARO_FILES.length

/** Index → URL ; utilisé par slides.js (imageStarts) */
export function photoUrl(index) {
  return BASE + encodeURIComponent(PHOTO_SARO_FILES[index % N])
}
/** URL pour un fichier par nom (ex. imgOverride) */
export function photoUrlByFile(filename) {
  return BASE + encodeURIComponent(filename)
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
