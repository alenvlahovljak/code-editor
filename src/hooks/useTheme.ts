import { useState, useLayoutEffect } from 'react';
import type { PaletteType } from '@material-ui/core';

const preferDarkSchema =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = preferDarkSchema ? 'dark' : 'light';

function useTheme() {
  const [theme, setTheme] = useState<string | PaletteType>(
    localStorage.getItem('theme') || defaultTheme
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

export default useTheme;
