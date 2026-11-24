const search = get('search-input');
const platform = get('platform');
const categoriesBar = get('categories');
const cards = get('cards');
const savedNav = get('saved-nav');
const previousFilters = history.state?.catalogFilters;
let selected = categories.some(item => item.id === previousFilters?.category) ? previousFilters.category : 'all';
if (previousFilters) {
  search.value = previousFilters.search;
  platform.value = previousFilters.platform;
}
const syncPlatformMenu = setupPlatformMenu(platform);
let savedOnly = new URLSearchParams(location.search).get('salvate') === '1';
let saved = readSavedProjects();

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
      <h3 class="card-title"><a class="card-open" href="proiecte/${project.id}/">${project.title}</a></h3>
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
  updateSavedCount(saved.size);
  savedNav.setAttribute('aria-pressed', String(savedOnly));
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
  syncPlatformMenu();
  search.value = '';
}
function scrollToCatalog() {
  get('catalog').scrollIntoView({ block: 'start' });
  get('catalog-title').focus({ preventScroll: true });
}
function setSavedView(value) {
  savedOnly = value;
  const url = new URL(location.href);
  if (value) url.searchParams.set('salvate', '1');
  else url.searchParams.delete('salvate');
  history.replaceState(history.state, '', url);
}
function clearSelection() {
  setSavedView(false);
  resetFilters();
  render();
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

window.addEventListener('pageshow', () => {
  if (history.state?.catalogFilters) {
    const state = { ...history.state };
    delete state.catalogFilters;
    history.replaceState(state, '');
  }
});
// Preserve the visitor's result set when they return from a project page.
document.addEventListener('click', event => {
  if (event.target.closest('.card-open, .app-tile, .promoted-link')) {
    history.replaceState({
      ...history.state,
      catalogFilters: { category: selected, platform: platform.value, search: search.value }
    }, '');
  }
});
cards.addEventListener('click', event => {
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) toggleSave(saveButton.dataset.save);
});
search.addEventListener('input', render);
get('search-form').addEventListener('submit', event => { event.preventDefault(); scrollToCatalog(); });
get('clear-search').addEventListener('click', () => { search.value = ''; render(); search.focus(); });
categoriesBar.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (button) { selected = button.dataset.category; render(); }
});
categoriesBar.addEventListener('focusin', event => {
  if (categoriesBar.scrollWidth > categoriesBar.clientWidth && event.target.matches('.category-btn:focus-visible')) {
    event.target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
});
platform.addEventListener('change', render);
get('reset').addEventListener('click', () => { clearSelection(); scrollToCatalog(); });
savedNav.addEventListener('click', () => {
  setSavedView(!savedOnly);
  render();
});
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
