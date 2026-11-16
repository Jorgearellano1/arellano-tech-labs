import { useState, useEffect } from 'react';

function readTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function readInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem('theme-v2') === 'light' ? 'light' : 'dark';
}

/**
 * Stays aligned with Header theme toggles via data-theme on <html>.
 */
const useSyncedTheme = () => {
  const [theme, setTheme] = useState(() => readInitialTheme());

  useEffect(() => {
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
