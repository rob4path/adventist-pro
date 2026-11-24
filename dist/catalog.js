// Promovarea de pe prima pagină. Schimbă projectId pentru a alege alt proiect din catalog.
const promotion = {
  enabled: true,                  // false dezactivează promovarea.
  projectId: 'zecimi-si-daruri',
  endsAt: null                    // Opțional, dată ISO cu fus orar: '2027-01-15T20:00:00+02:00'.
};

const categories = [
  { id: 'all', name: 'Toate', icon: 'grid' },
  { id: 'misiune', name: 'Misiune', icon: 'globe' },
  { id: 'comunicare', name: 'Comunicare', icon: 'link' },
  { id: 'daruri', name: 'Dăruire', icon: 'heart' },
  { id: 'muzica', name: 'Muzică', icon: 'music' },
  { id: 'studiu', name: 'Studiu Biblic', icon: 'book' },
  { id: 'carti', name: 'Publicații', icon: 'library' },
  { id: 'servicii', name: 'Servicii divine', icon: 'church' },
  { id: 'media', name: 'Media', icon: 'radio' }
];

const sperantaStores = {
  Android: 'https://play.google.com/store/apps/details?id=ro.hevsoft.rvs',
  iOS: 'https://apps.apple.com/ro/app/speranta/id1244670970'
};

const projects = [
  {
    id: 'toate-lucrurile-noi', title: 'Toate Lucrurile Noi', categories: ['misiune'], cover: 'misiune', preview: 'toate-lucrurile-noi-site', previewAlt: 'Pagina inițiativei Toate Lucrurile Noi în limba română', domain: 'all.things.new',
    summary: 'Găsește filme și materiale pentru a prezenta inițiativa misionară OneVoice27 în biserica ta.',
    detail: 'Toate Lucrurile Noi reunește materialele în limba română ale inițiativei OneVoice27. Găsești episoade despre viața lui Isus, mesaje video și o propunere de program pentru comunitatea locală.',
    guideTitle: 'Cum pregătești un program',
    steps: [
      { title: 'Citește despre inițiativă', text: 'În Descriere găsești scopul OneVoice27 și legătura sa cu viața și lucrarea lui Isus.' },
      { title: 'Alege materialul video', text: 'Intră în Video și alege un episod sau un mesaj potrivit pentru comunitatea ta.' },
      { title: 'Pregătește vizionarea', text: 'Urmărește materialul online sau folosește linkul de descărcare pentru a-l proiecta fără conexiune la internet.' }
    ],
    links: [
      { label: 'Materiale video', url: 'https://all.things.new/#videos' },
      { label: 'Propunere de program', url: 'https://all.things.new/#programul' }
    ],
    url: 'https://all.things.new/', platforms: ['Web'], keywords: 'OneVoice27 misiune pentru toți lansare program filme descărcări'
  },
  {
    id: 'adventist-romania', title: 'Adventist România', categories: ['comunicare'], cover: 'comunicare', preview: 'adventist-romania-site', previewAlt: 'Pagina oficială a Bisericii Adventiste din România', domain: 'adventist.ro',
    summary: 'Citește știrile Bisericii Adventiste din România și găsește resursele sau departamentul de care ai nevoie.',
    detail: 'Website-ul Bisericii Adventiste de Ziua a Șaptea din România publică știri, declarații și prezentări ale convingerilor adventiste. Meniul de organizare te conduce la departamente, iar pagina de contact te pune în legătură cu Uniunea.',
    guideTitle: 'Cum găsești informația dorită',
    steps: [
      { title: 'Consultă știrile', text: 'Deschide Știri pentru a citi despre inițiativele și evenimentele bisericii.' },
      { title: 'Caută un document', text: 'În Convingeri poți consulta convingerile fundamentale, declarațiile oficiale și ghidurile.' },
      { title: 'Găsește un departament', text: 'În Organizare alege Departamente și apoi domeniul care te interesează.' }
    ],
    links: [
      { label: 'Știri', url: 'https://adventist.ro/stiri/' },
      { label: 'Convingeri fundamentale', url: 'https://adventist.ro/convingeri/convingeri-fundamentale/' }
    ],
    social: {
      facebook: 'https://www.facebook.com/adventist.ro',
      instagram: 'https://www.instagram.com/adventist.ro/',
      youtube: 'https://www.youtube.com/@adventistromania'
    },
    url: 'https://adventist.ro/', platforms: ['Web'], keywords: 'uniune conferințe organizare știri convingeri comunicate departamente'
  },
  {
    id: 'resurse-pentru-slujire', title: 'Newsletter Resurse pentru slujire', categories: ['comunicare'], cover: 'comunicare', preview: 'resurse-pentru-slujire-site', previewAlt: 'Ediția 515 a newsletterului Resurse pentru slujire', domain: 'advent.ist/515',
    summary: 'Citește buletinul Uniunii Adventiste cu resurse pentru Sabat, anunțuri, publicații și știri.',
    detail: 'Newsletterul adună materiale pentru slujirea în biserica locală. Linkul deschide ediția 515, din 20 noiembrie 2026, pe care o poți citi direct în browser.',
    guideTitle: 'Cum folosești o ediție',
    steps: [
      { title: 'Consultă sumarul', text: 'La începutul ediției găsești titlurile grupate în rubrici precum Sabat, Anunțuri, Media și Publicații.' },
      { title: 'Deschide materialul', text: 'Mergi la rubrica dorită și urmează linkul din dreptul articolului pentru a citi mai mult sau a accesa resursa.' }
    ],
    links: [
      { label: 'Despre newsletter', url: 'https://adventist.pro/newsletter-resurse-pentru-slujire/' }
    ],
    url: 'https://advent.ist/515', platforms: ['Web'], keywords: 'newsletter buletin informativ sabat anunțuri slujire resurse pentru pastori'
  },
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
    id: 'adra', title: 'ADRA', categories: ['daruri'], cover: 'umanitar', preview: 'adra-site', previewAlt: 'Pagina ADRA România cu proiecte și modalități de implicare', domain: 'adra.ro',
    summary: 'Descoperă proiectele umanitare ADRA România și află cum poți contribui prin donații sau voluntariat.',
    detail: 'ADRA România sprijină persoanele vulnerabile prin proiecte de educație, sănătate și ajutor în situații de urgență. Pe website poți citi despre fiecare inițiativă și despre oamenii cărora li se adresează.',
    guideTitle: 'Cum te poți implica',
    steps: [
      { title: 'Descoperă proiectele', text: 'În Proiecte alege un domeniu, de exemplu educația copiilor sau sprijinul oferit după dezastre.' },
      { title: 'Alege cum contribui', text: 'În meniul Ajută! găsești pagini separate pentru donatori, voluntari și sponsori.' },
      { title: 'Urmează indicațiile ADRA', text: 'Consultă pagina modalității de sprijin alese pentru detaliile necesare.' }
    ],
    links: [
      { label: 'Proiectele ADRA', url: 'https://adra.ro/proiecte' },
      { label: 'Cum devii voluntar', url: 'https://adra.ro/cum-poti-ajuta/ca-voluntar' },
      { label: 'Cum poți dona', url: 'https://adra.ro/cum-poti-ajuta/ca-donator' }
    ],
    social: {
      facebook: 'https://www.facebook.com/adra.romania/',
      instagram: 'https://www.instagram.com/adraromania/',
      youtube: 'https://www.youtube.com/@adraromania4745'
    },
    url: 'https://adra.ro/', platforms: ['Web'], keywords: 'ajutor umanitar voluntariat donații dezvoltare educație urgențe'
  },
  {
    id: 'imnuri', title: 'Imnuri Creștine', categories: ['muzica', 'servicii'], cover: 'imnuri', preview: 'imnuri-site', previewAlt: 'Colecțiile de imnuri din MyBible', domain: 'mybible.eu/ro/hymns',
    summary: 'Găsește imnul potrivit și proiectează versurile pentru cântarea din biserică.',
    detail: "Colecțiile de imnuri din MyBible te ajută să pregătești cântările pentru Sabat. Poți citi versurile de pe telefon sau le poți proiecta pentru întreaga biserică.",
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
    id: 'mybible', title: 'MyBible', categories: ['studiu'], cover: 'studiu', preview: 'bible-site', previewAlt: 'Pagina de lectură biblică din MyBible', domain: 'mybible.eu',
    summary: 'Citește Biblia în mai multe traduceri și urmează un plan de studiu în ritmul tău.',
    detail: "Pe MyBible poți citi același pasaj în traduceri diferite sau poți urma un plan de lectură. Platforma reunește textul biblic, devoționale și studii pentru Școala de Sabat.",
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
    id: 'academia-speranta', title: 'Academia Speranța', categories: ['studiu'], cover: 'educatie', preview: 'academia-speranta-site', previewAlt: 'Pagina în limba română a platformei Academia Speranța', domain: 'academiasperanta.ro',
    summary: 'Studiază Biblia prin cursuri video și lecții scrise, în ritmul tău.',
    detail: 'Academia Speranța este platforma de studiu a Centrului Media Adventist. Biblioteca include cursuri despre Biblie, relații și comunicare, cu lecții pe care le poți parcurge online.',
    guideTitle: 'Cum începi un curs',
    steps: [
      { title: 'Explorează biblioteca', text: 'Deschide Cursuri și răsfoiește colecțiile de lecții video și scrise.' },
      { title: 'Alege o temă', text: 'Deschide pagina unui curs pentru a vedea descrierea și lista lecțiilor.' },
      { title: 'Începe studiul', text: 'Alege o lecție și urmează indicațiile cursului. Din contul tău poți reveni la biblioteca de studiu.' }
    ],
    links: [
      { label: 'Cursuri', url: 'https://academiasperanta.ro/ro/courses/' },
      { label: 'Despre Academia Speranța', url: 'https://academiasperanta.ro/ro/despre-proiect/' }
    ],
    social: {
      facebook: 'https://www.facebook.com/AcademiaSperanta/',
      instagram: 'https://www.instagram.com/academiasperanta/',
      youtube: 'https://www.youtube.com/@Academia-Speranta'
    },
    url: 'https://academiasperanta.ro/', platforms: ['Web'], keywords: 'cursuri biblie lecții studiu video școala biblică speranța'
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
    social: {
      facebook: 'https://www.facebook.com/edituraviatasisanatate',
      instagram: 'https://www.instagram.com/edituraviatasisanatate/',
      youtube: 'https://www.youtube.com/c/viatasisanatate_video'
    },
    url: 'https://viatasisanatate.ro/', platforms: ['Web'], keywords: 'editura librărie lectură familie biblii cărți copii carte'
  },
  {
    id: 'curierul-adventist', title: 'Curierul Adventist', categories: ['carti'], cover: 'revista', preview: 'curierul-adventist-site', previewAlt: 'Ediția prezentată pe website-ul Curierul Adventist', domain: 'curieruladventist.ro',
    summary: 'Citește revista Curierul Adventist și răsfoiește numerele anterioare în arhiva digitală.',
    detail: 'Curierul Adventist publică articole despre teologie, educație și viața bisericii. Website-ul reunește rubricile revistei și o arhivă de ediții în limba română, ordonate pe ani.',
    guideTitle: 'Cum găsești un număr al revistei',
    steps: [
      { title: 'Deschide ediția de pe prima pagină', text: 'Sub titlul revistei găsești luna și linkul de lectură al numărului prezentat.' },
      { title: 'Caută în arhivă', text: 'Alege intervalul de ani din meniul Arhivă, apoi numărul pe care dorești să îl citești.' },
      { title: 'Răsfoiește pe teme', text: 'În Categorii găsești rubrici precum Editorial, Teologie sau Pagina copiilor.' }
    ],
    links: [
      { label: 'Arhiva edițiilor recente', url: 'https://curieruladventist.ro/isuu-romana/' },
      { label: 'Editoriale', url: 'https://curieruladventist.ro/category/editorial/' }
    ],
    social: {
      facebook: 'https://www.facebook.com/CurierulAdventist'
    },
    url: 'https://curieruladventist.ro/', platforms: ['Web'], keywords: 'revistă publicații ediții arhivă biserică editorial'
  },
  {
    id: 'semnele-timpului', title: 'Semnele Timpului', categories: ['carti'], cover: 'revista', preview: 'semnele-timpului-site', previewAlt: 'Pagina publicației Semnele Timpului', domain: 'semneletimpului.ro',
    summary: 'Citește analize și opinii despre religie, societate și viața de zi cu zi dintr-o perspectivă creștină.',
    detail: 'Semnele Timpului publică articole despre credință, cultură, psihologie și relații. Pe website găsești atât textele recente, cât și articolele din revistă.',
    guideTitle: 'Cum găsești o lectură',
    steps: [
      { title: 'Alege un articol', text: 'Pe prima pagină poți deschide materialele recente din domeniul care te interesează.' },
      { title: 'Explorează revista', text: 'Intră în secțiunea Revista și alege dintre ultimele articole, recomandări sau cele mai populare texte.' }
    ],
    links: [
      { label: 'Articole din revistă', url: 'https://semneletimpului.ro/revista' }
    ],
    social: {
      facebook: 'https://www.facebook.com/semneletimpului',
      instagram: 'https://www.instagram.com/semnele.timpului/',
      youtube: 'https://www.youtube.com/@semneletimpului1493'
    },
    url: 'https://semneletimpului.ro/', platforms: ['Web'], keywords: 'revistă articole analize opinie religie societate cultură spiritualitate'
  },
  {
    id: 'radio-vocea-sperantei', title: 'Radio Vocea Speranței', categories: ['media'], cover: 'muzica', preview: 'rvs-site', previewAlt: 'Pagina principală Radio Vocea Speranței', domain: 'rvs.ro',
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
    social: {
      facebook: 'https://www.facebook.com/voceasperantei',
      instagram: 'https://www.instagram.com/voceasperantei',
      youtube: 'https://www.youtube.com/@SperantaFM'
    },
    stores: sperantaStores, url: 'https://rvs.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'radio RVS melodii audio podcast redare live cântece muzică creștină'
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
    social: {
      facebook: 'https://www.facebook.com/sperantatv.ro',
      instagram: 'https://www.instagram.com/sperantatv',
      youtube: 'https://www.youtube.com/@SperantaTVOficial'
    },
    stores: sperantaStores, url: 'https://www.sperantatv.ro/', platforms: ['Web', 'Android', 'iOS'], keywords: 'televiziune video live programe emisiuni speranta plus'
  }
];

const socialNetworkNames = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube' };

// The static page generator uses the same project records as the browser catalog.
if (typeof module !== 'undefined') module.exports = { projects, categories, socialNetworkNames };
