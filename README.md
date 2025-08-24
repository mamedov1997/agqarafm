# AGQARAFM — Admin-only Video Site (GitHub Pages)

Ağ-qara minimalist dizaynlı, mobil və kompüter üçün uyğun video sayt. Videoları yalnız **admin** `src/data/videos.json` faylını redaktə edərək əlavə edir. İstifadəçi qeydiyyatı **yoxdur**. Hər video üçün **baxış**, **Like**, **Dislike** sayğacları var — bu sayğaclar **localStorage** üzərində saxlanır (yəni hər istifadəçinin cihazına özəl, serversiz).

> Qeyd: GitHub Pages server tərəfli baza təqdim etmir; ona görə qlobal sayğac mümkün deyil. Əgər qlobal sayğac (bütün istifadəçilər üçün ortaq) istəyirsinizsə, sonradan Firebase/Supabase və ya öz backend əlavə etmək lazımdır.

## Qurulum (lokal)
```bash
npm install
npm run dev
```

## Deploy — GitHub Pages
1. Bu layihəni yeni repoya yükləyin (məs: `agqarafm-video-site`).
2. `vite.config.js` içində `base: '/agqarafm-video-site/'` dəyərini **repo adınıza** uyğun edin.
3. Repo `main` branch-ə push olunsun.
4. GitHub → Settings → Pages: **Build and deployment**: *GitHub Actions* seçin.
5. Bu repodakı **Deploy to GitHub Pages** workflow-u avtomatik işə düşəcək. Bitdikdən sonra sayt `https://USERNAME.github.io/REPO_NAME/` ünvanında açılacaq.

## Video əlavə etmək (yalnız admin)
- `src/data/videos.json` faylında yeni obyekt əlavə edin:
```json
{
  "id": "unique-id-003",
  "title": "Video Başlığı",
  "src": "/videos/my-video.mp4",
  "poster": "/videos/my-poster.jpg",
  "description": "Qısa təsvir.",
  "duration": "03:21"
}
```
- Faylları `public/videos/` qovluğuna yerləşdirin və ya xarici bir `https://...mp4` link verin.
- Siyahıdakı sıralama JSON sırasına görədir (“Yeni” sırala seçimi).

## Dizayn
- Ağ/qaranlıq (black & white) minimal üslub.
- Tam responsiv grid, yapışqan header, modal pleyer.

## Məhdudiyyətlər
- Sayğaclar (view/like/dislike) **cihaz üzrə** işləyir (localStorage).
- Qlobal sayım üçün backend tələb olunur.

## Lisenziya
MIT
