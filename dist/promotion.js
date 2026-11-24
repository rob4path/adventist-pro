(() => {
  if (!promotion.enabled) return;
  const project = projects.find(item => item.id === promotion.projectId);
  const deadline = promotion.endsAt === null ? Infinity : Date.parse(promotion.endsAt);
  if (!project || Number.isNaN(deadline) || deadline <= Date.now()) return;

  const hero = document.querySelector('.site-hero');
  const copy = hero.querySelector('.hero-copy');
  const art = hero.querySelector('.hero-art');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const originalPlaceholder = searchInput.placeholder;
  const heading = document.querySelector('.catalog-heading');
  const feature = document.getElementById('promotion-template').content.firstElementChild.cloneNode(true);
  feature.querySelector('h1').textContent = project.title;
  feature.querySelector('.promoted-description').textContent = project.summary;
  feature.querySelector('.promoted-domain').textContent = project.domain;
  feature.querySelector('.promoted-link').href = 'proiecte/' + encodeURIComponent(project.id) + '/';
  const preview = feature.querySelector('.promoted-preview');
  preview.src = 'assets/projects/' + project.preview + '.webp';
  preview.alt = project.previewAlt;
  if (project.mobilePreview) {
    const figure = feature.querySelector('figure');
    const phone = document.createElement('img');
    phone.className = 'promoted-phone';
    phone.src = 'assets/projects/' + project.mobilePreview + '.webp';
    phone.alt = '';
    figure.classList.add('has-mobile-preview');
    figure.append(phone);
  }

  heading.insertBefore(searchForm, heading.querySelector('.catalog-tools'));
  searchInput.placeholder = 'Caută în catalog…';
  heading.classList.add('has-search');
  copy.hidden = art.hidden = true;
  hero.querySelector('.feature-shell').append(feature);
  hero.setAttribute('aria-labelledby', 'promoted-title');
  hero.classList.add('has-promotion');

  if (!Number.isFinite(deadline)) return;
  let timer;
  function checkDeadline() {
    clearTimeout(timer);
    const remaining = deadline - Date.now();
    if (remaining > 0) {
      // Browsers limit individual timers to a signed 32-bit delay.
      timer = setTimeout(checkDeadline, Math.min(remaining, 2147483647));
      return;
    }
    window.removeEventListener('pageshow', checkDeadline);
    document.removeEventListener('visibilitychange', checkDeadline);
    const focus = document.activeElement;
    const focusWasInFeature = feature.contains(focus);
    feature.remove();
    copy.hidden = art.hidden = false;
    copy.append(searchForm);
    searchInput.placeholder = originalPlaceholder;
    heading.classList.remove('has-search');
    hero.classList.remove('has-promotion');
    hero.setAttribute('aria-labelledby', 'hero-title');
    if (focusWasInFeature) document.getElementById('catalog-title').focus({ preventScroll: true });
    if (searchForm.contains(focus)) focus.focus({ preventScroll: true });
  }
  window.addEventListener('pageshow', checkDeadline);
  document.addEventListener('visibilitychange', checkDeadline);
  checkDeadline();
})();
