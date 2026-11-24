(() => {
  const storageKey = 'adventist.pro.theme';
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function readPreference() {
    try {
      return localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark';
    } catch {
      return root.dataset.theme || 'dark';
    }
  }

  function apply(theme) {
    root.dataset.theme = theme;
    themeColor.content = theme === 'dark' ? '#0d171b' : '#f7faf9';
    const button = document.getElementById('theme-toggle');
    if (button) {
      const action = theme === 'dark' ? 'Activează tema luminoasă' : 'Activează tema întunecată';
      button.setAttribute('aria-label', action);
      button.title = action;
    }
  }

  // Apply the preference before styles paint, including on a direct project visit.
  apply(readPreference());

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');
    apply(root.dataset.theme);
    button.hidden = false;
    button.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      try { localStorage.setItem(storageKey, theme); } catch { /* The current page still switches. */ }
    });
  });

  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) apply(readPreference());
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) apply(readPreference());
  });
})();
