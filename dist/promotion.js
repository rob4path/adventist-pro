(() => {
  if (!promotion.enabled) return;
  const project = projects.find(item => item.id === promotion.projectId);
  const deadline = promotion.endsAt === null ? Infinity : Date.parse(promotion.endsAt);
  if (!project || Number.isNaN(deadline) || deadline <= Date.now()) return;

  const template = document.getElementById('promotion-template');
  const feature = template.content.firstElementChild.cloneNode(true);
  feature.querySelector('h2').textContent = project.title;
  feature.querySelector('.featured-description').textContent = project.summary;
  feature.querySelector('.promoted-link').href = 'proiecte/' + encodeURIComponent(project.id) + '/';
  const preview = feature.querySelector('.featured-preview img');
  preview.src = 'assets/projects/' + project.preview + '.webp';
  preview.alt = project.previewAlt;
  template.replaceWith(feature);

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
    const focusWasInFeature = feature.contains(document.activeElement);
    feature.remove();
    if (focusWasInFeature) document.getElementById('catalog-title').focus({ preventScroll: true });
  }
  window.addEventListener('pageshow', checkDeadline);
  document.addEventListener('visibilitychange', checkDeadline);
  checkDeadline();
})();
