const choices = document.querySelector('.phone-choices');
if (choices) {
  const link = get('mobile-preview');
  const image = link.querySelector('img');
  choices.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    const { src, alt, width, height } = button.dataset;
    link.setAttribute('href', src);
    image.alt = alt;
    image.width = Number(width);
    image.height = Number(height);
    image.src = src;
    choices.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
  });
  choices.hidden = false;
}

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
