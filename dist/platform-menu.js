function setupPlatformMenu(select) {
  const control = select.parentElement;
  const trigger = get('platform-trigger');
  const label = get('platform-label');
  const menu = get('platform-menu');
  trigger.dataset.defaultLabel = select.options[0].label;
  const buttons = Array.from(select.options, option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'platform-option';
    button.tabIndex = -1;
    button.setAttribute('role', 'menuitemradio');
    button.innerHTML =
      '<span class="platform-option-icon">' + icon(platformIcon[option.value] || 'grid') + '</span>' +
      '<span></span><span class="platform-check">' + icon('check') + '</span>';
    button.children[1].textContent = option.label;
    button.addEventListener('click', () => {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      closeMenu(true);
    });
    menu.append(button);
    return button;
  });

  function syncSelection() {
    if (select.selectedIndex < 0) select.selectedIndex = 0;
    label.textContent = select.selectedOptions[0].label;
    trigger.setAttribute('aria-label', 'Filtrează după platformă: ' + label.textContent);
    trigger.classList.toggle('is-filtered', select.value !== '');
    trigger.querySelector('.platform-symbol').innerHTML = icon(platformIcon[select.value] || 'sliders');
    buttons.forEach((button, index) => {
      button.setAttribute('aria-checked', String(index === select.selectedIndex));
    });
  }

  function positionMenu() {
    if (menu.hidden) return;
    const rect = trigger.getBoundingClientRect();
    const below = document.documentElement.clientHeight - rect.bottom;
    const above = rect.top;
    const opensUp = below < menu.scrollHeight + 12 && above > below;
    control.classList.toggle('opens-up', opensUp);
    menu.style.maxHeight = Math.max(48, (opensUp ? above : below) - 12) + 'px';
  }

  function openMenu() {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    positionMenu();
    buttons[select.selectedIndex].focus({ preventScroll: true });
  }

  function closeMenu(restoreFocus) {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }

  trigger.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu(true));
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu();
    }
  });
  menu.addEventListener('keydown', event => {
    const index = buttons.indexOf(document.activeElement);
    let target;
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeMenu(true);
        return;
      case 'Tab':
        closeMenu(true);
        return;
      case 'ArrowDown': target = buttons[(index + 1) % buttons.length]; break;
      case 'ArrowUp': target = buttons[(index - 1 + buttons.length) % buttons.length]; break;
      case 'Home': target = buttons[0]; break;
      case 'End': target = buttons[buttons.length - 1]; break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          target = buttons.find(button => button.textContent.toLowerCase().startsWith(event.key.toLowerCase()));
        }
    }
    if (target) {
      event.preventDefault();
      target.focus();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!menu.hidden && !control.contains(event.target)) closeMenu(false);
  });
  control.addEventListener('focusout', event => {
    if (!menu.hidden && event.relatedTarget && !control.contains(event.relatedTarget)) closeMenu(false);
  });
  window.addEventListener('resize', positionMenu);
  window.addEventListener('scroll', positionMenu, { passive: true });
  select.addEventListener('change', syncSelection);
  syncSelection();
  select.hidden = true;
  trigger.hidden = false;
  return syncSelection;
}
