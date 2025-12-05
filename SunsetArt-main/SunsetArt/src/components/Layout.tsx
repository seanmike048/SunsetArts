import React from 'react';
import { Camera, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
    children: React.ReactNode;
    onSettingsClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onSettingsClick }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-6 max-w-md mx-auto relative overflow-hidden transition-colors duration-300">
            {/* Abstract Background Elements - theme aware */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-sunset-peach/40 dark:bg-sunset-peach/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-sunset-blush/40 dark:bg-sunset-blush/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-sunset-lavender/40 dark:bg-sunset-lavender/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

            {/* Header */}
            <header className="w-full flex items-center justify-between mb-8 z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl">
                        <Camera className="w-5 h-5 text-light-text dark:text-dark-text" />
                    </div>
                    <h1 className="text-lg font-semibold tracking-tight text-light-text dark:text-dark-text">
                        Sunset Art Lens
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/40 dark:hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                        {theme === 'light' ? (
                            <Moon className="w-5 h-5 text-light-text" />
                        ) : (
                            <Sun className="w-5 h-5 text-dark-text" />
                        )}
                    </button>

                    {/* Settings Button */}
                    <button
                        onClick={onSettingsClick}
                        className="p-2 bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/40 dark:hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Settings"
                    >
                        <Settings className="w-5 h-5 text-light-text dark:text-dark-text" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full flex-1 flex flex-col z-10">
                {children}
            </main>
        </div>
    );
};
