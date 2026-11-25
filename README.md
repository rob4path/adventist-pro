# adventist.pro

Catalog în limba română pentru aplicații, site-uri și resurse adventiste. Poți căuta un proiect după nume, categorie sau platformă. Pe pagina fiecărui proiect găsești o prezentare, indicații de utilizare și linkuri către resursele oficiale.

[Deschide catalogul](https://adventist-pro.techandfriends.ro/) · [Proiectul pe GitHub](https://github.com/rob4path/adventist-pro)

## Pornire locală

Ai nevoie de Git, Node.js 22 și Python 3. Generatorul folosește doar module incluse în Node.js. Următoarele comenzi descarcă proiectul, generează paginile și pornesc serverul local.

```sh
git clone https://github.com/rob4path/adventist-pro.git
cd adventist-pro
node build.cjs
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Deschide [catalogul local](http://127.0.0.1:8000/). După ce editezi sursele, rulează din nou `node build.cjs` într-un al doilea terminal, din rădăcina proiectului, apoi reîncarcă pagina.

## Unde găsești fiecare lucru

| Fișier sau director | Rol |
| --- | --- |
| [src/content/catalog.js](src/content/catalog.js) | Proiectele, categoriile, platformele și promovarea de pe prima pagină. |
| [src/index.html](src/index.html) | Pagina principală, cele trei pictograme din antet și elementele comune preluate pe paginile proiectelor. |
| [src/assets/](src/assets/) | Fonturi și identitate vizuală. Siglele și capturile proiectelor se află în [src/assets/projects/](src/assets/projects/). |
| [src/scripts/](src/scripts/) · [src/styles/](src/styles/) | Interacțiunile din browser și stilurile catalogului. |
| [build.cjs](build.cjs) | Copiază fișierele statice și generează câte o pagină de prezentare pentru fiecare proiect. |
| `dist/` | Site-ul generat pentru previzualizare și publicare. Git ignoră acest director. |
| [wrangler.jsonc](wrangler.jsonc) | Configurația Cloudflare pentru generarea site-ului și publicarea pe domeniul public. |

## Adaugă sau actualizează un proiect

1. Deschide lista `projects` din [catalog.js](src/content/catalog.js). Pentru o intrare nouă, poți folosi `adventist-romania` ca model pentru un site sau `mybible` pentru o aplicație cu versiuni Web, Android și iOS.
2. Alege un `id` unic, cu litere mici și cratime, și păstrează-l după publicare. Acesta devine adresa `/proiecte/<id>/` și identifică proiectul în lista „Salvate”. Alege identificatorii de categorie din lista `categories`.
3. Completează `summary` pentru card și `detail`, `guideTitle` și `steps` pentru pagina de prezentare. Verifică adresa oficială din `url`, platformele disponibile și, pentru aplicații, linkurile din `stores`.
4. Adaugă imaginile în [src/assets/projects/](src/assets/projects/). Pentru captura site-ului, `preview: 'bible-site'` indică fișierul `bible-site.webp`, iar `previewAlt` descrie imaginea. În `mobileScreenshots`, fiecare captură are numele complet al fișierului, dimensiunile, eticheta și textul alternativ. Prima captură apare peste imaginea site-ului pe pagina proiectului.
5. Regenerează site-ul. Caută proiectul în catalogul local, deschide pagina lui și verifică imaginile și linkurile.

### Alege aplicația promovată

În obiectul `promotion` de la începutul [catalogului](src/content/catalog.js), alege proiectul prin `projectId` și eticheta prin `appLabel`. De exemplu, `projectId: 'zecimi-si-daruri'` selectează „Zecimi și Daruri”. Cu `enabled: true` afișezi cardul, iar cu `enabled: false` îl ascunzi. Valoarea `endsAt: null` lasă promovarea fără dată de expirare. Pentru retragere automată, setează o dată cu fus orar, de exemplu `endsAt: '2027-01-15T20:00:00+02:00'`. Regenerează site-ul după modificare.

## Trimite o contribuție

Creează o ramură pentru modificare. Dacă lucrezi din afara echipei, folosește un fork al proiectului. Verifică rezultatul local și deschide un pull request către `main` cu sursele și imaginile modificate. În descriere, menționează proiectul afectat și ce ai verificat. Pentru schimbări vizuale, o captură de ecran ajută la revizuire.

## Publicare pe Cloudflare

Pentru a publica versiunea verificată, rulează comenzile de mai jos din rădăcina proiectului. Autentificarea se face cu un cont care are acces la site.

```sh
npx wrangler@4 login
npx wrangler@4 deploy
```

Wrangler rulează generatorul configurat în [wrangler.jsonc](wrangler.jsonc) și publică fișierele din `dist/`. Verifică pagina modificată pe [site-ul public](https://adventist-pro.techandfriends.ro/).
