(() => {
  if (!promotion.enabled) return;
  const project = projects.find(item => item.id === promotion.projectId);
  const deadline = promotion.endsAt === null ? Infinity : Date.parse(promotion.endsAt);
  if (!project || Number.isNaN(deadline) || deadline <= Date.now()) return;

  const template = document.getElementById('promotion-template');
  const feature = template.content.firstElementChild.cloneNode(true);
  feature.querySelector('h2').textContent = project.title;
  feature.querySelector('.featured-description').textContent = project.summary;
  const link = feature.querySelector('.promoted-link');
  link.href = 'proiecte/' + encodeURIComponent(project.id) + '/';
  if (project.platforms.includes('Android') || project.platforms.includes('iOS')) {
    feature.querySelector('.featured-kicker').textContent = promotion.appLabel || 'Aplicație recomandată';
    link.textContent = 'Descoperă aplicația';
  }

  const figure = feature.querySelector('.featured-preview');
  const screens = (project.mobileScreenshots || []).slice(0, 2);
  if (screens.length) {
    feature.classList.add('featured-app');
    figure.classList.toggle('has-secondary', screens.length > 1);
    screens.forEach((screen, index) => {
      const image = new Image(screen.width, screen.height);
      image.className = index === 0 ? 'featured-phone' : 'featured-phone-secondary';
      image.alt = index === 0 ? screen.alt : '';
      image.src = 'assets/projects/' + screen.file;
      figure.append(image);
    });
  } else {
    const image = new Image();
    image.alt = project.previewAlt;
    image.src = 'assets/projects/' + project.preview + '.webp';
    figure.append(image);
  }
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
