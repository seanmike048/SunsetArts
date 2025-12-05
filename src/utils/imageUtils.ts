/**
 * Image compression utility for optimizing artwork images before API upload
 */

export interface CompressedImage {
    dataUrl: string;
    base64: string;
    width: number;
    height: number;
    originalSize: number;
    compressedSize: number;
}

/**
 * Compress an image file to reduce size and dimensions
 * @param file - The image file to compress
 * @param maxSize - Maximum dimension (width or height) in pixels
 * @param quality - JPEG quality (0-1)
 */
export async function compressImage(
    file: File,
    maxSize: number = 800,
    quality: number = 0.75
): Promise<CompressedImage> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height = (height * maxSize) / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = (width * maxSize) / height;
                        height = maxSize;
                    }
                }

                // Create canvas and compress
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Convert to JPEG data URL
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                const base64 = dataUrl.split(',')[1];

                resolve({
                    dataUrl,
                    base64,
                    width: Math.round(width),
                    height: Math.round(height),
                    originalSize: file.size,
                    compressedSize: Math.round((base64.length * 3) / 4), // Approximate size
                });
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target?.result as string;
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}
