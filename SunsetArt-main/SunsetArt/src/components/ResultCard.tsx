import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export interface AnalysisResult {
    artist: string;
    period: string;
    style: string;
    context: string;
    meaning: string;
    technique: string;
}

interface ResultCardProps {
    isLoading: boolean;
    result: AnalysisResult | null;
    error: string | null;
    isSlowResponse?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ isLoading, result, error, isSlowResponse = false }) => {
    if (!isLoading && !result && !error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/40 dark:border-white/20 mt-6"
        >
            {error ? (
                // Error State
                <div className="flex items-start gap-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{error}</p>
                </div>
            ) : isLoading ? (
                // Loading State
                <div className="space-y-4">
                    {isSlowResponse && (
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary italic">
                            Still analyzing this artwork…
                        </p>
                    )}
                    <div className="space-y-3 animate-pulse">
                        <div className="h-6 bg-white/50 dark:bg-white/20 rounded w-3/4"></div>
                        <div className="h-4 bg-white/50 dark:bg-white/20 rounded w-1/2"></div>
                        <div className="space-y-2 pt-4">
                            <div className="h-4 bg-white/50 dark:bg-white/20 rounded w-full"></div>
                            <div className="h-4 bg-white/50 dark:bg-white/20 rounded w-full"></div>
                            <div className="h-4 bg-white/50 dark:bg-white/20 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            ) : (
                // Result State
                <div className="space-y-4 text-light-text dark:text-dark-text">
                    <div>
                        <h2 className="text-xl font-bold leading-tight">{result?.artist}</h2>
                        <p className="text-sm opacity-70 font-medium">{result?.period}</p>
                    </div>

                    <div className="inline-block px-3 py-1 bg-white/50 dark:bg-white/20 rounded-full text-xs font-semibold tracking-wide uppercase opacity-80">
                        {result?.style}
                    </div>

                    <div className="space-y-3 text-sm leading-relaxed opacity-90">
                        <p>{result?.context}</p>
                        <p className="italic border-l-2 border-sunset-peach pl-3 my-2">
                            "{result?.meaning}"
                        </p>
                        <p className="text-xs opacity-70 uppercase tracking-wider mt-4">
                            Technique: {result?.technique}
                        </p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
