import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { storage } from '../utils/storage';

type Theme = 'light' | 'dark';
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeMode, setThemeModeState] = useState<ThemeMode>(() => storage.getTheme());
    const [theme, setTheme] = useState<Theme>('light');

    // Detect system preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateTheme = () => {
            if (themeMode === 'system') {
                setTheme(mediaQuery.matches ? 'dark' : 'light');
            } else {
                setTheme(themeMode as Theme);
            }
        };

        updateTheme();

        // Listen for system theme changes
        mediaQuery.addEventListener('change', updateTheme);
        return () => mediaQuery.removeEventListener('change', updateTheme);
    }, [themeMode]);

    // Apply theme to document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
        storage.setTheme(mode);
    };

    const toggleTheme = () => {
        const newMode = theme === 'light' ? 'dark' : 'light';
        setThemeMode(newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
