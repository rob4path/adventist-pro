updateSavedCount(readSavedProjects().size);
window.addEventListener('pageshow', () => updateSavedCount(readSavedProjects().size));

const copyButton = get('copy-link');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  const url = document.querySelector('link[rel="canonical"]').href;
  try {
    await navigator.clipboard.writeText(url);
    notify('Linkul paginii a fost copiat.');
  } catch {
    const field = document.querySelector('.share-fallback');
    field.hidden = false;
    const input = field.querySelector('input');
    input.value = url;
    input.focus();
    input.select();
  }
});
