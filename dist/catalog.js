const categories = [
  { id: 'all', name: 'Toate', icon: 'grid' },
  { id: 'daruri', name: 'Dăruire', icon: 'heart' },
  { id: 'muzica', name: 'Muzică', icon: 'music' },
  { id: 'studiu', name: 'Studiu biblic', icon: 'book' },
  { id: 'carti', name: 'Cărți', icon: 'library' },
  { id: 'servicii', name: 'Servicii divine', icon: 'church' },
  { id: 'media', name: 'Media', icon: 'radio' }
];

const sperantaStores = {
  Android: 'https://play.google.com/store/apps/details?id=ro.hevsoft.rvs',
  iOS: 'https://apps.apple.com/ro/app/speranta/id1244670970'
};

const projects = [
  {
    id: 'zecimi-si-daruri', title: 'Zecimi și Daruri', categories: ['daruri'], cover: 'daruri', preview: 'daruri-site', previewAlt: 'Prezentarea oficială Zecimi și Daruri', domain: 'zecimisidaruri.ro',
    summary: 'Oferă online zecimea și darurile pentru biserica ta sau pentru un proiect pe care îl susții.',
    detail: "Prin Zecimi și Daruri poți susține biserica locală sau un proiect adventist. Alegi destinația contribuției și suma pe care dorești să o oferi.",
    guideTitle: "Cum oferi un dar",
    steps: [
      { title: "Alege destinația", text: "Caută biserica pe care vrei să o susții sau deschide un proiect pentru a afla cui îi este destinat darul." },
      { title: "Stabilește contribuția", text: "Selectează tipul contribuției și introdu suma. Dacă susții un proiect, verifică denumirea acestuia." },
      { title: "Verifică și confirmă", text: "Recitește destinația și suma afișate, apoi urmează pașii de plată din platformă." },
    ],
    stores: { Android: 'https://play.google.com/store/apps/details?id=ro.adventist.offerings', iOS: 'https://apps.apple.com/ro/app/tithes-and-offerings/id6830202200' },
    url: 'https://zecimisidaruri.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'donații dăruire zecime contribuții dar mygiving'
  },
  {
    id: 'mybible', title: 'myBible', categories: ['studiu'], cover: 'studiu', preview: 'bible-site', previewAlt: 'Pagina de lectură biblică din myBible', domain: 'mybible.eu',
    summary: 'Citește Biblia în mai multe traduceri și urmează un plan de studiu în ritmul tău.',
    detail: "Pe myBible poți citi același pasaj în traduceri diferite sau poți urma un plan de lectură. Platforma reunește textul biblic, devoționale și studii pentru Școala de Sabat.",
    guideTitle: "Cum studiezi un pasaj",
    steps: [
      { title: "Deschide textul biblic", text: "Intră în secțiunea Biblia. Alege cartea și capitolul, de exemplu Ioan 1." },
      { title: "Compară traducerile", text: "Selectează traducerea dorită. Folosește opțiunea Paralel ca să urmărești același pasaj în două versiuni." },
      { title: "Continuă cu un plan", text: "În secțiunea Planuri, alege o lectură potrivită timpului pe care vrei să îl dedici studiului." },
    ],
    links: [
      { label: "Citește Biblia", url: "https://mybible.eu/ro/bible" },
      { label: "Planuri de lectură", url: "https://mybible.eu/ro/plans" },
    ],
    stores: { Android: 'https://play.google.com/store/apps/details?id=com.up2date.mybible', iOS: 'https://apps.apple.com/ro/app/mybible/id948744181' },
    url: 'https://mybible.eu/ro', platforms: ['Web', 'Android', 'iOS'], keywords: 'biblie biblia scoala de sabat devoțional scriptura lectiuni'
  },
  {
    id: 'radio-vocea-sperantei', title: 'Radio Vocea Speranței', categories: ['muzica', 'media'], cover: 'muzica', preview: 'rvs-site', previewAlt: 'Pagina principală Radio Vocea Speranței', domain: 'rvs.ro',
    summary: 'Ascultă muzică creștină și emisiuni despre credință, familie și viața de zi cu zi.',
    detail: "Radio Vocea Speranței transmite muzică creștină, interviuri și emisiuni despre credință, familie și societate. Poți asculta postul în direct sau poți reveni la o ediție din arhivă.",
    guideTitle: "Cum asculți radioul",
    steps: [
      { title: "Pornește transmisia în direct", text: "Deschide site-ul radioului și pornește redarea din player." },
      { title: "Găsește o emisiune", text: "Consultă programul pentru ora difuzării. Dacă ai ratat o ediție, caută titlul în secțiunea Emisiuni." },
      { title: "Ascultă și pe telefon", text: "Instalează Speranța+ și selectează Radio Vocea Speranței pentru a asculta de pe mobil." },
    ],
    links: [
      { label: "Programul radio", url: "https://rvs.ro/program" },
      { label: "Arhiva de emisiuni", url: "https://rvs.ro/emisiuni" },
    ],
    stores: sperantaStores, url: 'https://rvs.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'radio RVS melodii audio podcast redare live cântece muzică creștină'
  },
  {
    id: 'viata-si-sanatate', title: 'Viață și Sănătate', categories: ['carti'], cover: 'carti', wordmark: 'editura-logo.svg', preview: 'editura-site', previewAlt: 'Librăria online Viață și Sănătate', domain: 'viatasisanatate.ro',
    summary: 'Descoperă Biblii, cărți de spiritualitate și lecturi pentru copii în librăria editurii.',
    detail: "Librăria online a Editurii Viață și Sănătate reunește Biblii, cărți pentru copii și lecturi de spiritualitate. Fișa fiecărui titlu te ajută să alegi o ediție pentru tine sau pentru a o oferi în dar.",
    guideTitle: "Cum găsești o carte",
    steps: [
      { title: "Pornește de la un titlu sau o categorie", text: "Folosește căutarea dacă știi numele cărții. Pentru idei, răsfoiește secțiunile Biblii sau Cărți pentru copii." },
      { title: "Compară edițiile", text: "Pentru Biblii, filtrează după mărime sau copertă. Deschide titlurile care te interesează și citește descrierile." },
      { title: "Verifică detaliile cărții", text: "În pagina produsului găsești prețul și informațiile despre ediție. De acolo poți adăuga cartea în coș." },
    ],
    links: [
      { label: "Biblii", url: "https://viatasisanatate.ro/produse/biblii" },
      { label: "Cărți pentru copii", url: "https://viatasisanatate.ro/produse/carti/copii" },
    ],
    url: 'https://viatasisanatate.ro/', platforms: ['Web'], keywords: 'editura librărie lectură familie biblii cărți copii carte'
  },
  {
    id: 'imnuri', title: 'Imnuri creștine', categories: ['servicii', 'muzica'], cover: 'imnuri', preview: 'imnuri-site', previewAlt: 'Colecțiile de imnuri din myBible', domain: 'mybible.eu/ro/hymns',
    summary: 'Găsește imnul potrivit și proiectează versurile pentru cântarea din biserică.',
    detail: "Colecțiile de imnuri din myBible te ajută să pregătești cântările pentru Sabat. Poți citi versurile de pe telefon sau le poți proiecta pentru întreaga biserică.",
    guideTitle: "Cum pregătești o cântare",
    steps: [
      { title: "Alege colecția", text: "Deschide Imnuri creștine pentru repertoriul comunității sau alege o colecție pentru copii ori tineret." },
      { title: "Găsește imnul", text: "În colecția aleasă, caută cântarea după număr sau titlu și deschide pagina cu versurile." },
      { title: "Proiectează versurile", text: "Pentru cântarea în comun, conectează calculatorul la ecranul bisericii și deschide modul de proiecție al imnului." },
    ],
    links: [
      { label: "Colecția Imnuri creștine", url: "https://mybible.eu/ro/hymns/imnuri-crestine" },
      { label: "Imnuri pentru tineret", url: "https://mybible.eu/ro/hymns/imnuri-tineret" },
    ],
    url: 'https://mybible.eu/ro/hymns', platforms: ['Web'], keywords: 'închinare sabat proiector proiecție programe cântări cântare biserică imn versuri tools'
  },
  {
    id: 'speranta-tv', title: 'Speranța TV', categories: ['media'], cover: 'tv', wordmark: 'tv-logo.webp', preview: 'tv-site', previewAlt: 'Pagina principală Speranța TV', domain: 'sperantatv.ro',
    summary: 'Urmărește în direct programe creștine sau alege o emisiune din arhiva video.',
    detail: "Speranța TV transmite emisiuni, predici, interviuri și concerte. Poți urmări postul în direct pe site, poți reveni la o înregistrare sau poți folosi aplicația Speranța+ pe telefon.",
    guideTitle: "Cum urmărești o emisiune",
    steps: [
      { title: "Verifică programul", text: "Deschide Program TV pentru a vedea ce se difuzează și la ce oră începe emisiunea dorită." },
      { title: "Urmărește transmisia", text: "Intră în secțiunea Live și pornește playerul. Pe telefon, poți urmări postul și în aplicația Speranța+." },
      { title: "Revino la o ediție", text: "Dacă emisiunea a trecut, deschide Arhivă și caută titlul sau episodul pe care vrei să îl vezi." },
    ],
    links: [
      { label: "Transmisia în direct", url: "https://www.sperantatv.ro/urmareste-live/" },
      { label: "Programul TV", url: "https://www.sperantatv.ro/program-tv/" },
    ],
    stores: sperantaStores, url: 'https://www.sperantatv.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'televiziune video live programe emisiuni speranta plus'
  }
];

// The static page generator uses the same project records as the browser catalog.
if (typeof module !== 'undefined') module.exports = { projects, categories };
