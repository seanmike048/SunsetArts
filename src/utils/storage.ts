/**
 * Secure storage utility for API keys and user settings
 */

import { config } from '../config/config';

const STORAGE_PREFIX = 'sunset_art_lens_';

interface AppSettings {
    apiKey?: string;
    apiProvider: 'gemini' | 'custom';
    theme: 'light' | 'dark' | 'system';
}

/**
 * Simple obfuscation (note: not true encryption, requires backend for that)
 */
function obfuscate(text: string): string {
    return btoa(encodeURIComponent(text));
}

function deobfuscate(text: string): string {
    try {
        return decodeURIComponent(atob(text));
    } catch {
        return '';
    }
}

export const storage = {
    getApiKey(): string | null {
        const storedKey = localStorage.getItem(`${STORAGE_PREFIX}api_key`);
        if (storedKey) return deobfuscate(storedKey);

        const envKey = config.apiKey;
        return envKey?.trim() ? envKey : null;
    },

    setApiKey(key: string): void {
        localStorage.setItem(`${STORAGE_PREFIX}api_key`, obfuscate(key));
    },

    removeApiKey(): void {
        localStorage.removeItem(`${STORAGE_PREFIX}api_key`);
    },

    getSettings(): Partial<AppSettings> {
        const settingsStr = localStorage.getItem(`${STORAGE_PREFIX}settings`);
        if (!settingsStr) return {};

        try {
            return JSON.parse(settingsStr);
        } catch {
            return {};
        }
    },

    setSettings(settings: Partial<AppSettings>): void {
        const current = this.getSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(updated));
    },

    getTheme(): 'light' | 'dark' | 'system' {
        return this.getSettings().theme || 'system';
    },

    setTheme(theme: 'light' | 'dark' | 'system'): void {
        this.setSettings({ theme });
    },

    getApiProvider(): 'gemini' | 'custom' {
        return this.getSettings().apiProvider || 'gemini';
    },

    setApiProvider(provider: 'gemini' | 'custom'): void {
        this.setSettings({ apiProvider: provider });
    },
};
