const categories = [
  { id: 'all', name: 'Toate', icon: 'grid' },
  { id: 'daruri', name: 'Zecimi și daruri', icon: 'heart' },
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
    detail: 'Alege comunitatea sau proiectul căruia vrei să îi dăruiești. Poți face acest lucru de pe site sau din aplicația mobilă.',
    stores: { Android: 'https://play.google.com/store/apps/details?id=ro.adventist.offerings', iOS: 'https://apps.apple.com/ro/app/tithes-and-offerings/id6830202200' },
    url: 'https://zecimisidaruri.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'donații dăruire zecime contribuții dar mygiving'
  },
  {
    id: 'mybible', title: 'myBible', categories: ['studiu'], cover: 'studiu', preview: 'bible-site', previewAlt: 'Pagina de lectură biblică din myBible', domain: 'mybible.eu',
    summary: 'Citește Biblia în mai multe traduceri și urmează un plan de studiu în ritmul tău.',
    detail: 'Explorează pasajele biblice, devoționalele și studiile Școlii de Sabat. Biblioteca include și comentarii care te ajută să aprofundezi textul.',
    stores: { Android: 'https://play.google.com/store/apps/details?id=com.up2date.mybible', iOS: 'https://apps.apple.com/ro/app/mybible/id948744181' },
    url: 'https://mybible.eu/ro', platforms: ['Web', 'Android', 'iOS'], keywords: 'biblie biblia scoala de sabat devoțional scriptura lectiuni'
  },
  {
    id: 'radio-vocea-sperantei', title: 'Radio Vocea Speranței', categories: ['muzica', 'media'], cover: 'muzica', preview: 'rvs-site', previewAlt: 'Pagina principală Radio Vocea Speranței', domain: 'rvs.ro',
    summary: 'Ascultă muzică creștină și emisiuni despre credință, familie și viața de zi cu zi.',
    detail: 'Ascultă postul în direct sau caută o ediție în arhiva de emisiuni. Pe mobil, găsești radioul în aplicația Speranța+.',
    stores: sperantaStores, url: 'https://rvs.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'radio RVS melodii audio podcast redare live cântece muzică creștină'
  },
  {
    id: 'viata-si-sanatate', title: 'Viață și Sănătate', categories: ['carti'], cover: 'carti', wordmark: 'editura-logo.svg', preview: 'editura-site', previewAlt: 'Librăria online Viață și Sănătate', domain: 'viatasisanatate.ro',
    summary: 'Descoperă Biblii, cărți de spiritualitate și lecturi pentru copii în librăria editurii.',
    detail: 'Răsfoiește oferta editurii sau caută un titlu pentru biblioteca ta, pentru familie ori pentru a-l oferi în dar.',
    url: 'https://viatasisanatate.ro/', platforms: ['Web'], keywords: 'editura librărie lectură familie biblii cărți copii carte'
  },
  {
    id: 'imnuri', title: 'Imnuri creștine', categories: ['servicii', 'muzica'], cover: 'imnuri', preview: 'imnuri-site', previewAlt: 'Colecțiile de imnuri din myBible', domain: 'mybible.eu/ro/hymns',
    summary: 'Găsește imnul potrivit și proiectează versurile pentru cântarea din biserică.',
    detail: 'Colecțiile de imnuri de pe myBible adună cântări pentru comunitate, copii și tineret. Deschide un imn pentru a citi sau a proiecta versurile.',
    url: 'https://mybible.eu/ro/hymns', platforms: ['Web'], keywords: 'închinare sabat proiector proiecție programe cântări cântare biserică imn versuri tools'
  },
  {
    id: 'speranta-tv', title: 'Speranța TV', categories: ['media'], cover: 'tv', wordmark: 'tv-logo.webp', preview: 'tv-site', previewAlt: 'Pagina principală Speranța TV', domain: 'sperantatv.ro',
    summary: 'Urmărește în direct programe creștine sau alege o emisiune din arhiva video.',
    detail: 'Explorează programele postului de televiziune al Centrului Media Adventist. Pe mobil poți urmări transmisia și prin aplicația Speranța+.',
    stores: sperantaStores, url: 'https://www.sperantatv.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'televiziune video live programe emisiuni speranta plus'
  }
];
