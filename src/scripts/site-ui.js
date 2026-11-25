const paths = {
  facebook: '<path fill="currentColor" stroke="none" d="M14.3 22v-8.8h3l.5-3.5h-3.5V7.5c0-1 .3-1.7 1.8-1.7H18V2.6a22 22 0 0 0-2.8-.2c-2.8 0-4.7 1.7-4.7 4.8v2.5H7.4v3.5h3.1V22z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>',
  youtube: '<path d="M21.3 7.4a2.5 2.5 0 0 0-1.8-1.8C17.9 5.1 14.9 5 12 5s-5.9.1-7.5.6a2.5 2.5 0 0 0-1.8 1.8C2.2 8.9 2.2 10.7 2.2 12s0 3.1.5 4.6a2.5 2.5 0 0 0 1.8 1.8c1.6.5 4.6.6 7.5.6s5.9-.1 7.5-.6a2.5 2.5 0 0 0 1.8-1.8c.5-1.5.5-3.3.5-4.6s0-3.1-.5-4.6Z"/><path fill="currentColor" stroke="none" d="M10 8.7v6.6l5.6-3.3z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.8 14A8.8 8.8 0 0 1 10 3.2 9 9 0 1 0 20.8 14Z"/>',
  link: '<path d="m10.5 13.5 3-3M8.7 15.3l-1 1a3.6 3.6 0 0 1-5.1-5.1l4-4a3.6 3.6 0 0 1 5.1 0m.6 9.6a3.6 3.6 0 0 0 5.1 0l4-4a3.6 3.6 0 0 0-5.1-5.1l-1 1"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.1"/><rect x="14" y="3" width="7" height="7" rx="1.1"/><rect x="3" y="14" width="7" height="7" rx="1.1"/><rect x="14" y="14" width="7" height="7" rx="1.1"/>',
  heart: '<path d="M20.5 4.8a5.2 5.2 0 0 0-7.4 0L12 6l-1.1-1.2a5.2 5.2 0 0 0-7.4 7.4L12 21l8.5-8.8a5.2 5.2 0 0 0 0-7.4Z"/>',
  music: '<path d="M9 18V6l11-3v12M9 9l11-3"/><ellipse cx="6.5" cy="18.5" rx="2.5" ry="2"/><ellipse cx="17.5" cy="15.5" rx="2.5" ry="2"/>',
  book: '<path d="M12 5.5c-3-2-6-2.5-10-1.5v15c3.7-.9 7-.4 10 1.5 3-1.9 6.3-2.4 10-1.5V4c-4-1-7-.5-10 1.5Zm0 0v15"/>',
  library: '<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="8.5" y="4" width="4" height="16" rx="1"/><path d="m14 5 4-1 3.5 15.5-4 1z"/>',
  church: '<path d="M9 4h6m-3-2v5m-5 6 5-6 5 6v8H7zM3 21v-7l4-2m14 9v-7l-4-2m-7 9v-4a2 2 0 0 1 4 0v4M2 21h20"/>',
  radio: '<rect x="2.5" y="9" width="19" height="12" rx="2"/><path d="m5 8 13-6M6 13h5m-5 3h4"/><circle cx="16.5" cy="15.5" r="2.5"/>',
  sliders: '<path d="M3 6.5h5m4 0h9M3 17.5h10m4 0h4"/><circle cx="10" cy="6.5" r="2"/><circle cx="15" cy="17.5" r="2"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
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
const dialog = get('details');
const storageKey = 'adventist.pro.saved.v1';

function readSavedProjects() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) return new Set(stored.filter(id => projects.some(project => project.id === id)));
  } catch { /* Keep the catalog usable when storage is unavailable. */ }
  return new Set();
}

function updateSavedCount(size) {
  get('saved-num').textContent = String(size);
  get('saved-num').hidden = !size;
}

let noticeTimer;
function notify(message) {
  clearTimeout(noticeTimer);
  get('notice').textContent = message;
  get('notice').hidden = false;
  noticeTimer = setTimeout(() => { get('notice').hidden = true; }, 1800);
}

document.querySelectorAll('.about').forEach(button => button.addEventListener('click', () => {
  get('dialog-content').innerHTML = '<div class="dialog-body about-body"><img class="about-mark" src="assets/semn.svg" alt=""><h2 id="dialog-title" class="dialog-title">Despre adventist.pro</h2><p>O carte pentru acasă, un imn pentru Sabat sau o aplicație pentru daruri. Aici poți descoperi proiectele digitale ale comunității adventiste din România și poți ajunge direct la cei care le dezvoltă.</p><p>Proiectele pe care le salvezi rămân în acest browser.</p></div>';
  dialog.showModal();
  get('close-dialog').focus({ preventScroll: true });
}));
get('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
