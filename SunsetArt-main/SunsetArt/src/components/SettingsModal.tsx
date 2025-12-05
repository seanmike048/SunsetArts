import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { storage } from '../utils/storage';
import { strings } from '../config/config';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const [apiKey, setApiKey] = useState('');
    const [provider, setProvider] = useState<'gemini' | 'custom'>('gemini');

    useEffect(() => {
        if (isOpen) {
            setApiKey(storage.getApiKey() || '');
            setProvider(storage.getApiProvider());
        }
    }, [isOpen]);

    const handleSave = () => {
        if (apiKey.trim()) {
            storage.setApiKey(apiKey.trim());
        } else {
            storage.removeApiKey();
        }
        storage.setApiProvider(provider);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 z-10"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {strings.settings.title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-5">
                        {/* API Provider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {strings.settings.apiProvider}
                            </label>
                            <select
                                value={provider}
                                onChange={(e) => setProvider(e.target.value as 'gemini' | 'custom')}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sunset-peach focus:border-transparent outline-none transition-all"
                            >
                                <option value="gemini">{strings.settings.providerGemini}</option>
                                <option value="custom">{strings.settings.providerCustom}</option>
                            </select>
                        </div>

                        {/* API Key */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {strings.settings.apiKey}
                            </label>
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder={strings.settings.apiKeyPlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-sunset-peach focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Help Link */}
                        <a
                            href="https://ai.google.dev/gemini-api/docs/api-key"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-sunset-peach hover:text-sunset-blush transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            {strings.settings.getApiKeyInstructions}
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                        >
                            {strings.settings.cancel}
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 rounded-xl bg-sunset-peach hover:bg-sunset-blush text-white dark:text-gray-900 transition-colors font-medium shadow-sm"
                        >
                            {strings.settings.save}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
