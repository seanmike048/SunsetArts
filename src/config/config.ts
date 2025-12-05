/**
 * Application configuration and UI strings
 */

export const config = {
    // API Configuration
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    geminiApiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',

    // Image Processing
    maxImageSize: 800,
    imageQuality: 0.75,

    // Timeouts
    analysisTimeout: 10000, // 10 seconds
    slowResponseThreshold: 3000, // 3 seconds
};

// UI Strings (ready for i18n)
export const strings = {
    app: {
        name: 'Sunset Art Lens',
    },
    scanner: {
        title: 'Scan Artwork',
        subtitle: 'Tap to capture or upload',
    },
    result: {
        analyzing: 'Analyzing artwork...',
        stillAnalyzing: 'Still analyzing this artwork…',
        error: 'Unable to analyze this artwork. Please try again.',
        noApiKey: 'Please add your API key in Settings to analyze artworks.',
    },
    settings: {
        title: 'Settings',
        apiProvider: 'AI Provider',
        apiKey: 'API Key',
        apiKeyPlaceholder: 'Enter your Gemini API key',
        providerGemini: 'Google Gemini',
        providerCustom: 'Custom API',
        save: 'Save',
        cancel: 'Cancel',
        getApiKeyInstructions: 'Get a free API key from Google AI Studio',
    },
    theme: {
        light: 'Light mode',
        dark: 'Dark mode',
    },
    errors: {
        imageCompression: 'Failed to process image',
        apiError: 'Failed to analyze artwork',
        networkError: 'Network error. Please check your connection.',
        invalidApiKey: 'Invalid API key. Please check your settings.',
    },
};
