(function () {
  const STORAGE_KEY = 'food-guru-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  }

  function resolveTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function initTheme() {
    applyTheme(resolveTheme());
  }

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
    return theme;
  }

  function toggleTheme() {
    return setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  window.FoodGuruTheme = { initTheme, getTheme, setTheme, toggleTheme, STORAGE_KEY };
  initTheme();
})();
