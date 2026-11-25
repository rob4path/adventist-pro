const fs = require('node:fs');
const path = require('node:path');
const { projects, categories, socialNetworkNames } = require('./src/content/catalog.js');

const root = __dirname;
const source = path.join(root, 'src');
const dist = path.join(root, 'dist');
const home = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
const origin = 'https://adventist-pro.techandfriends.ro';

// Reuse the catalog identity, footer and about dialog on each presentation page.
const identity = home.split('<!-- shared-identity:start -->')[1].split('<!-- shared-identity:end -->')[0].trimEnd();
const footer = home.slice(home.indexOf('  <footer>'), home.indexOf('</body>'))
  .replace('Despre proiect', 'Despre catalog');
const categoryById = new Map(categories.map(category => [category.id, category]));
const platformIcons = { Web: 'globe', Android: 'android', iOS: 'apple' };

function html(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function linkRow(url, label, icon, description) {
  return `<a class="resource-link" href="${html(url)}" target="_blank" rel="noopener noreferrer">
    <span class="resource-icon" data-icon="${icon}"></span>
    <span><strong>${html(label)}</strong>${description ? '<small>' + html(description) + '</small>' : ''}</span>
  </a>`;
}

function linksPanel(project) {
  const resources = (project.links || []).map(link =>
    linkRow(link.url, link.label, 'globe', new URL(link.url).hostname.replace(/^www\./, ''))
  ).join('');
  const appName = ['speranta-tv', 'radio-vocea-sperantei'].includes(project.id) ? 'Speranța+' : project.title;
  const stores = Object.entries(project.stores || {}).map(([name, url]) =>
    linkRow(url, name === 'Android' ? 'Google Play' : 'App Store', platformIcons[name], appName + ' · ' + name)
  ).join('');
  const social = Object.entries(project.social || {}).map(([network, url]) =>
    linkRow(url, socialNetworkNames[network], network)
  ).join('');
  const sections = [
    ['Linkuri utile', resources],
    ['Aplicația mobilă', stores],
    ['Rețele sociale', social]
  ].filter(([, rows]) => rows)
    .map(([heading, rows]) => '<section><h2>' + heading + '</h2>' + rows + '</section>');
  return sections.length ? '<aside class="links-panel" aria-label="Resurse oficiale">' + sections.join('\n') + '</aside>' : '';
}

function projectPreview(project) {
  const frame = `<div class="preview-frame">
              <div class="preview-toolbar"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${html(project.domain)}</span></div>
              <img src="assets/projects/${html(project.preview)}.webp" alt="${html(project.previewAlt)}" fetchpriority="high">
            </div>`;
  const screen = project.mobileScreenshots?.[0];
  const classes = 'project-visual visual-' + html(project.cover);
  if (!screen) return `<figure class="${classes}">
            ${frame}
          </figure>`;

  const src = 'assets/projects/' + html(screen.file);
  return `<figure class="${classes} with-mobile">
            ${frame}
            <a class="phone-preview" href="${src}">
              <span class="sr-only">Deschide captura la dimensiune completă. </span>
              <img src="${src}" width="${screen.width}" height="${screen.height}" alt="${html(screen.alt)}">
            </a>
          </figure>`;
}

function projectPage(project) {
  const route = 'proiecte/' + project.id + '/';
  const title = html(project.title);
  const tags = project.categories.map(id => {
    const category = categoryById.get(id);
    return `<span class="project-tag"><span data-icon="${category.icon}"></span>${html(category.name)}</span>`;
  }).join('');
  const platforms = project.platforms.map(name =>
    `<span class="platform-item"><span data-icon="${platformIcons[name]}"></span>${name}</span>`
  ).join('');
  const steps = project.steps.map(step =>
    `<li><div><h3>${html(step.title)}</h3><p>${html(step.text)}</p></div></li>`
  ).join('\n          ');
  return `<!doctype html>
<html lang="ro" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0d171b">
  <base href="../../">
  <title>${title} · adventist.pro</title>
  <meta name="description" content="${html(project.summary)}">
  <meta property="og:title" content="${title} · adventist.pro">
  <meta property="og:description" content="${html(project.summary)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${origin}/assets/projects/${project.preview}.webp">
  <meta property="og:image:alt" content="${html(project.previewAlt)}">
  <link rel="canonical" href="${origin}/${route}">
  <link rel="icon" href="assets/semn.svg" type="image/svg+xml">
  <link rel="preload" as="font" href="assets/dm-sans-latin.woff2" type="font/woff2" crossorigin>
  <script src="theme.js"></script>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="project.css">
  <script src="catalog.js" defer></script>
  <script src="site-ui.js" defer></script>
  <script src="project.js" defer></script>
</head>
<body class="project-page">
  <a class="skip" href="${route}#prezentare">Sari la prezentare</a>
  <main id="prezentare" class="project-main">
    <header class="project-banner" aria-labelledby="project-title">
      <div class="wrap feature-shell">${identity}
        <nav class="crumbs" aria-label="Poziția în catalog"><a href="./#catalog">Catalog</a><span aria-hidden="true">/</span><span aria-current="page">${title}</span></nav>
        <div class="project-intro">
          <div class="intro-copy">
            <div class="project-tags">${tags}</div>
            <h1 id="project-title">${title}</h1>
            <p class="intro-text">${html(project.detail)}</p>
            <div class="platform-list" aria-label="Platforme disponibile">${platforms}</div>
            <div class="project-actions">
              <a class="dark-button" href="${html(project.url)}" target="_blank" rel="noopener noreferrer"><span data-icon="globe"></span>Website</a>
              <button class="copy-link" type="button" id="copy-link" hidden><span data-icon="link"></span>Copiază link</button>
            </div>
            <label class="share-fallback" hidden>Adresa paginii<input type="url" readonly></label>
          </div>
          ${projectPreview(project)}
        </div>
      </div>
    </header>
    <div class="wrap project-info">
      <section class="project-guide" aria-labelledby="guide-title">
        <h2 id="guide-title">${html(project.guideTitle)}</h2>
        <ol class="steps">
          ${steps}
        </ol>
      </section>
      ${linksPanel(project)}
    </div>
  </main>
${footer}</body>
</html>
`;
}

function build(output) {
  fs.copyFileSync(path.join(source, 'index.html'), path.join(output, 'index.html'));
  fs.cpSync(path.join(source, 'assets'), path.join(output, 'assets'), { recursive: true });
  // Keep the existing public URLs as contributors organize source files by role.
  fs.copyFileSync(path.join(source, 'content/catalog.js'), path.join(output, 'catalog.js'));
  for (const folder of ['scripts', 'styles']) {
    fs.cpSync(path.join(source, folder), output, { recursive: true });
  }

  const ids = new Set();
  for (const project of projects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id)) {
      throw new Error(`Invalid or duplicate project ID: ${project.id}`);
    }
    ids.add(project.id);
    const directory = path.join(output, 'proiecte', project.id);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'index.html'), projectPage(project));
  }
}

// Render first so a catalog error leaves the last successful preview available.
const staging = fs.mkdtempSync(path.join(root, '.build-'));
try {
  build(staging);
  fs.rmSync(dist, { recursive: true, force: true });
  fs.renameSync(staging, dist);
} finally {
  fs.rmSync(staging, { recursive: true, force: true });
}
console.log(`Built the catalog and ${projects.length} project pages in dist/.`);
