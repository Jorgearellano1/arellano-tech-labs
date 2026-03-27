import { useState, useEffect } from 'react';

function readTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function readInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

/**
 * Stays aligned with Header theme toggles via data-theme on <html>.
 */
const useSyncedTheme = () => {
  const [theme, setTheme] = useState(() => readInitialTheme());

  useEffect(() => {
    setTheme(readTheme());
    const obs = new MutationObserver(() => {
      setTheme(readTheme());
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => obs.disconnect();
  }, []);

  return theme;
};

export default useSyncedTheme;
