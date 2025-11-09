'use client'

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Cargar tema inicial
  useEffect(() => {
    setMounted(true);
    
    // Intentar cargar desde localStorage
    const savedTheme = localStorage.getItem('nutriplan-theme') as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Si no hay tema guardado, usar preferencia del sistema
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }
  }, []);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Solo aplicar si no hay preferencia guardada
      if (!localStorage.getItem('nutriplan-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('nutriplan-theme', newTheme);
    applyTheme(newTheme);
  };

  const setLightTheme = () => {
    setTheme('light');
    localStorage.setItem('nutriplan-theme', 'light');
    applyTheme('light');
  };

  const setDarkTheme = () => {
    setTheme('dark');
    localStorage.setItem('nutriplan-theme', 'dark');
    applyTheme('dark');
  };

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    mounted, // Útil para evitar flash de contenido
  };
};