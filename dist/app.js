const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.1"/><rect x="14" y="3" width="7" height="7" rx="1.1"/><rect x="3" y="14" width="7" height="7" rx="1.1"/><rect x="14" y="14" width="7" height="7" rx="1.1"/>',
  heart: '<path d="M20.5 4.8a5.2 5.2 0 0 0-7.4 0L12 6l-1.1-1.2a5.2 5.2 0 0 0-7.4 7.4L12 21l8.5-8.8a5.2 5.2 0 0 0 0-7.4Z"/>',
  music: '<path d="M9 18V6l11-3v12M9 9l11-3"/><ellipse cx="6.5" cy="18.5" rx="2.5" ry="2"/><ellipse cx="17.5" cy="15.5" rx="2.5" ry="2"/>',
  book: '<path d="M12 5.5c-3-2-6-2.5-10-1.5v15c3.7-.9 7-.4 10 1.5 3-1.9 6.3-2.4 10-1.5V4c-4-1-7-.5-10 1.5Zm0 0v15"/>',
  library: '<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="8.5" y="4" width="4" height="16" rx="1"/><path d="m14 5 4-1 3.5 15.5-4 1z"/>',
  church: '<path d="M9 4h6m-3-2v5m-5 6 5-6 5 6v8H7zM3 21v-7l4-2m14 9v-7l-4-2m-7 9v-4a2 2 0 0 1 4 0v4M2 21h20"/>',
  radio: '<rect x="2.5" y="9" width="19" height="12" rx="2"/><path d="m5 8 13-6M6 13h5m-5 3h4"/><circle cx="16.5" cy="15.5" r="2.5"/>',
  sliders: '<path d="M3 6.5h5m4 0h9M3 17.5h10m4 0h4"/><circle cx="10" cy="6.5" r="2"/><circle cx="15" cy="17.5" r="2"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  search: '<circle cx="10.2" cy="10.2" r="6.6"/><path d="m15.2 15.2 5.4 5.4"/>',
  bookmark: '<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  android: '<path d="M4 15.5a8 8 0 0 1 16 0H4ZM7 7 5 4m12 3 2-3"/><path d="M8.5 12.5h.3m6.4 0h.3" stroke-width="2"/>',
  apple: '<path fill="currentColor" stroke="none" d="M15.8 1.5c.2 1.4-.4 2.8-1.2 3.7-.9 1.1-2.2 1.8-3.6 1.7-.2-1.2.5-2.8 1.3-3.7.9-1 2.3-1.7 3.5-1.7Zm3.8 15.1c-.4 1.1-.8 2-1.5 3.1-.9 1.3-2.1 2.9-3.7 2.8-1.4 0-1.8-.9-3.6-.9-1.7 0-2.2.9-3.6.9-1.5.1-2.7-1.4-3.6-2.8-2.5-3.9-2.9-8.6-1.3-11C3.5 7 5.2 6 6.9 6c1.4 0 2.3.9 3.5.9 1.2 0 2-.9 3.8-1 1.5 0 3.1.8 4.2 2.2-3.6 2.1-3 6.7 1.2 8.5Z" transform="translate(1 0)"/>'
};
const platformIcon = { Web: 'globe', Android: 'android', iOS: 'apple' };
const icon = name => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + paths[name] + '</svg>';
document.querySelectorAll('[data-icon]').forEach(slot => { slot.innerHTML = icon(slot.dataset.icon); });

const get = id => document.getElementById(id);
const search = get('search-input');
const dialog = get('details');
const platform = get('platform');
const categoriesBar = get('categories');
const cards = get('cards');
const savedNav = get('saved-nav');
const storageKey = 'adventist.pro.saved.v1';
let selected = 'all';
let savedOnly = false;
let noticeTimer;
let saved = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(stored)) saved = new Set(stored.filter(id => projects.some(project => project.id === id)));
} catch { /* Favorites still work for the current visit when storage is unavailable. */ }

const category = id => categories.find(item => item.id === id);
const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('ro').trim();
const index = new Map(projects.map(project => [project.id, normalize([
  project.title, project.summary, project.detail, project.domain, project.keywords,
  ...project.categories.map(id => category(id).name), ...project.platforms
].join(' '))]));

function platformList(project) {
  return '<div class="platform-list" aria-label="Platforme">' + project.platforms.map(name =>
    '<span class="platform-item">' + icon(platformIcon[name]) + name + '</span>'
  ).join('') + '</div>';
}

function categoryTag(project) {
  const item = category(project.categories[0]);
  return '<span class="category-tag tag-' + item.id + '">' + icon(item.icon) + item.name + '</span>';
}

function asset(file, className) {
  return '<img class="' + className + '" src="assets/projects/' + file + '" alt="" loading="lazy" draggable="false">';
}

function browserPreview(project) {
  return '<div class="browser-preview"><div class="browser-chrome"><i></i><i></i><i></i></div>' +
    asset(project.preview + '.webp', 'site-image') + '</div>';
}

const signalBars = [12,21,32,19,35,57,40,24,45,70,48,32,67,83,60,46,73,92,65,47,66,78,58,41,65,81,97,74,56,68,80,66,48,66,85,58,40,52,34,19,30,48,31,16,28,42,23,13];
const waveform = '<div class="waveform">' + signalBars.map(height => '<i style="height:' + height + '%"></i>').join('') + '</div>';

function coverArt(project) {
  let content;
  switch (project.cover) {
    case 'daruri':
      content = asset('daruri-proiect.webp', 'gift-device gift-back') + asset('daruri-acasa.webp', 'gift-device gift-front');
      break;
    case 'studiu':
      content = asset('bible-logo.svg', 'bible-mark') + asset('bible-mobile.webp', 'bible-phone');
      break;
    case 'muzica':
      content = waveform + asset('rvs-logo.webp', 'station-logo');
      break;
    case 'carti':
      content = '<div class="shelf">' + ['carte-1.webp','carte-2.webp','carte-3.webp'].map((file, i) => asset(file, 'book book-' + i)).join('') + '</div>';
      break;
    default:
      content = browserPreview(project);
  }
  return '<div class="card-cover cover-' + project.cover + '" aria-hidden="true">' + content + '</div>';
}

function card(project) {
  const isSaved = saved.has(project.id);
  return `<article class="card">
    ${coverArt(project)}
    <div class="card-body">
      <div class="card-top">${categoryTag(project)}
        <button type="button" class="round-button save-card" data-save="${project.id}" aria-pressed="${isSaved}" aria-label="${isSaved ? 'Elimină din proiectele salvate' : 'Salvează proiectul'} · ${project.title}">${icon('bookmark')}</button>
      </div>
      <h3 class="card-title"><button class="card-open" type="button" data-open="${project.id}">${project.title}</button></h3>
      <p>${project.summary}</p>${platformList(project)}
    </div>
  </article>`;
}

categoriesBar.innerHTML = categories.map(item => `<button type="button" class="category-btn" data-category="${item.id}" aria-pressed="false">${icon(item.icon)}${item.name}</button>`).join('');

function render() {
  const words = normalize(search.value).split(/\s+/).filter(Boolean);
  const filtered = projects.filter(project =>
    (!savedOnly || saved.has(project.id)) &&
    (selected === 'all' || project.categories.includes(selected)) &&
    (!platform.value || project.platforms.includes(platform.value)) &&
    words.every(word => index.get(project.id).includes(word))
  );
  cards.innerHTML = filtered.map(card).join('');
  get('catalog-title').innerHTML = savedOnly ? 'Proiecte salvate' : '<span class="wide-title">Explorează proiectele</span><span class="compact-title">Proiecte</span>';
  get('total').textContent = String(filtered.length);
  get('result-status').textContent = filtered.length === 1 ? 'Un proiect afișat.' : filtered.length + ' proiecte afișate.';
  get('saved-num').textContent = String(saved.size);
  get('saved-num').hidden = !saved.size;
  savedNav.setAttribute('aria-pressed', String(savedOnly));
  const nav = document.querySelector('.nav-catalog');
  if (savedOnly) nav.removeAttribute('aria-current');
  else nav.setAttribute('aria-current', 'page');
  categoriesBar.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === selected)));
  get('shortcut').hidden = !!search.value;
  get('clear-search').hidden = !search.value;
  get('empty').hidden = filtered.length !== 0;
  const noSaved = savedOnly && !saved.size;
  get('empty-title').textContent = noSaved ? 'Lista ta de proiecte este goală' : 'Niciun proiect găsit';
  get('empty-description').textContent = noSaved ? 'Apasă semnul de carte de pe un proiect ca să îl găsești aici.' : 'Încearcă alt cuvânt sau schimbă filtrele pentru a vedea mai multe proiecte.';
}

function resetFilters() {
  selected = 'all';
  platform.value = '';
  search.value = '';
}
function scrollToCatalog() {
  get('catalog').scrollIntoView({ block: 'start' });
  get('catalog-title').focus({ preventScroll: true });
}
function clearSelection() {
  savedOnly = false;
  resetFilters();
  render();
}
function notify(message) {
  clearTimeout(noticeTimer);
  get('notice').textContent = message;
  get('notice').hidden = false;
  noticeTimer = setTimeout(() => { get('notice').hidden = true; }, 1800);
}
function toggleSave(id) {
  const removing = saved.has(id);
  if (removing) saved.delete(id);
  else saved.add(id);
  try { localStorage.setItem(storageKey, JSON.stringify([...saved])); } catch { /* Session-only fallback. */ }
  render();
  const target = cards.querySelector('[data-save="' + id + '"]') || cards.querySelector('[data-save]') || get('reset');
  target.focus({ preventScroll: true });
  notify(removing ? 'Proiect eliminat din lista ta.' : 'Proiect adăugat în lista ta.');
}

function showDetails(project) {
  const wordmark = project.wordmark ? asset(project.wordmark, 'dialog-wordmark') : '';
  const stores = project.stores ? '<div class="store-links">' + Object.entries(project.stores).map(([name, url]) =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer">${name === 'iOS' ? 'App Store' : 'Google Play'}</a>`
  ).join('') + '</div>' : '';
  get('dialog-content').innerHTML = `<div class="dialog-cover"><img src="assets/projects/${project.preview}.webp" alt="${project.previewAlt}"></div>
    <div class="dialog-body"><div class="dialog-type">${categoryTag(project)}${wordmark}</div><h2 class="dialog-title" id="dialog-title">${project.title}</h2>
      <p>${project.detail}</p>${platformList(project)}
      <div class="dialog-actions"><a class="dark-button" href="${project.url}" target="_blank" rel="noopener noreferrer">${icon('globe')} Deschide site-ul</a><span class="site-domain">${project.domain}</span></div>
      ${stores}
    </div>`;
  dialog.showModal();
  get('close-dialog').focus({ preventScroll: true });
}

cards.addEventListener('click', event => {
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) return toggleSave(saveButton.dataset.save);
  const openButton = event.target.closest('[data-open]');
  if (openButton) showDetails(projects.find(project => project.id === openButton.dataset.open));
});
document.querySelector('.hero-art').addEventListener('click', event => {
  const tile = event.target.closest('[data-feature]');
  if (tile) showDetails(projects.find(project => project.id === tile.dataset.feature));
});
document.querySelectorAll('.about').forEach(button => button.addEventListener('click', () => {
  get('dialog-content').innerHTML = '<div class="dialog-body about-body"><img class="about-mark" src="assets/semn.svg" alt=""><h2 id="dialog-title" class="dialog-title">Despre adventist.pro</h2><p>O carte pentru acasă, un imn pentru Sabat sau o aplicație pentru daruri. Aici poți descoperi proiectele digitale ale comunității adventiste din România și poți ajunge direct la cei care le dezvoltă.</p><p>Această machetă prezintă șase exemple. Proiectele pe care le salvezi rămân în acest browser.</p></div>';
  dialog.showModal();
  get('close-dialog').focus({ preventScroll: true });
}));
get('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
search.addEventListener('input', render);
get('search-form').addEventListener('submit', event => { event.preventDefault(); scrollToCatalog(); });
get('clear-search').addEventListener('click', () => { search.value = ''; render(); search.focus(); });
categoriesBar.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (button) { selected = button.dataset.category; render(); }
});
platform.addEventListener('change', render);
get('reset').addEventListener('click', () => { clearSelection(); scrollToCatalog(); });
savedNav.addEventListener('click', () => {
  savedOnly = !savedOnly;
  resetFilters();
  render();
  scrollToCatalog();
});
document.querySelector('.nav-catalog').addEventListener('click', () => { clearSelection(); });
document.querySelectorAll('.home').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  clearSelection();
  window.scrollTo(0, 0);
}));
document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !dialog.open && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    search.focus();
    search.select();
  }
});
render();
