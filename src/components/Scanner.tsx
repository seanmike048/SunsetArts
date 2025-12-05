import React, { useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScannerProps {
    onImageSelect: (file: File) => void;
    selectedImage: string | null;
    onClear: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onImageSelect, selectedImage, onClear }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImageSelect(file);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <AnimatePresence mode="wait">
                {!selectedImage ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full"
                    >
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`
                aspect-[4/5] w-full rounded-3xl border-2 border-dashed
                flex flex-col items-center justify-center gap-4 cursor-pointer
                transition-all duration-300 ease-out
                ${isDragging
                                    ? 'border-light-text/50 dark:border-dark-text/50 bg-white/20 dark:bg-white/10 scale-[1.02]'
                                    : 'border-white/40 dark:border-white/30 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/60 dark:hover:border-white/50'}
              `}
                        >
                            <div className="p-4 bg-white/30 dark:bg-white/20 rounded-full shadow-sm backdrop-blur-sm">
                                <Camera className="w-8 h-8 text-light-text/80 dark:text-dark-text/80" />
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-medium text-light-text dark:text-dark-text">Scan Artwork</p>
                                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">Tap to capture or upload</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full relative"
                    >
                        <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-lg relative bg-black/5 dark:bg-black/20 border-2 border-light-border/40 dark:border-dark-border/40">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={onClear}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                capture="environment"
            />
        </div>
    );
};
