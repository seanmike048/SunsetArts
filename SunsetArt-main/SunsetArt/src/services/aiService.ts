import type { AnalysisResult } from '../components/ResultCard';
import { compressImage } from '../utils/imageUtils';
import { storage } from '../utils/storage';
import { config, strings } from '../config/config';

interface GeminiResponse {
    candidates?: Array<{
        content: {
            parts: Array<{
                text: string;
            }>;
        };
    }>;
    error?: {
        message: string;
        code: number;
    };
}

/**
 * Parse the AI response into structured AnalysisResult
 */
function parseAIResponse(text: string): AnalysisResult {
    // The AI should return structured content, attempt to parse it
    const lines = text.split('\n').filter(line => line.trim());

    // Default fallback
    const result: AnalysisResult = {
        artist: 'Unknown Artist',
        period: 'Unknown Period',
        style: 'Unknown Style',
        context: '',
        meaning: '',
        technique: '',
    };

    // Try to extract structured information
    // This is a simple parser - the AI prompt will structure the response
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (i === 0 && !line.toLowerCase().includes('artist:')) {
            result.artist = line;
        } else if (line.toLowerCase().includes('artist:')) {
            result.artist = line.replace(/artist:/i, '').trim();
        } else if (line.toLowerCase().includes('period:') || line.toLowerCase().includes('date:')) {
            result.period = line.replace(/period:|date:/i, '').trim();
        } else if (line.toLowerCase().includes('style:') || line.toLowerCase().includes('movement:')) {
            result.style = line.replace(/style:|movement:/i, '').trim();
        }
    }

    // Join remaining lines for context, meaning, and technique
    const bodyText = lines.slice(2).join(' ');
    const sentences = bodyText.split(/\.\s+/);

    if (sentences.length >= 3) {
        result.context = sentences.slice(0, 2).join('. ') + '.';
        result.meaning = sentences.slice(2, 5).join('. ') + '.';
        result.technique = sentences.slice(5).join('. ') || 'Details not available.';
    } else {
        result.context = bodyText;
    }

    return result;
}

/**
 * Analyze an artwork image using Gemini Vision API
 */
export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
    // Get API key
    const apiKey = storage.getApiKey();
    if (!apiKey) {
        throw new Error(strings.result.noApiKey);
    }

    try {
        // Step 1: Compress image
        const compressed = await compressImage(file, config.maxImageSize, config.imageQuality);

        // Step 2: Call Gemini API
        const prompt = `You are an art expert. Analyze this artwork image and provide a concise explanation in exactly 5-15 lines.

Structure your response as follows:
1. Artist name and approximate period (if identifiable, otherwise say "Unknown artist" or "Uncertain period")
2. Artistic movement/style (e.g., Impressionism, Cubism, Street Art)
3. 1-3 lines of historical and cultural context
4. 2-4 lines on what the artist may have wanted to express (themes, emotions, symbolism) - CLEARLY MARK THIS AS INTERPRETATION
5. 1-2 lines on composition, colors, and technique

Keep your tone educational, precise, and accessible. Use short sentences. No filler text, no buzzwords.`;

        const requestBody = {
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: 'image/jpeg',
                            data: compressed.base64,
                        },
                    },
                ],
            }],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 500,
            },
        };

        const response = await fetch(`${config.geminiApiEndpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error(strings.errors.invalidApiKey);
            }
            throw new Error(`API error: ${response.status}`);
        }

        const data: GeminiResponse = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No analysis result returned');
        }

        const text = data.candidates[0].content.parts[0].text;
        return parseAIResponse(text);

    } catch (error) {
        if (error instanceof Error) {
            // Re-throw known errors
            if (error.message.includes('API key') || error.message === strings.result.noApiKey) {
                throw error;
            }
            throw new Error(strings.errors.apiError + ': ' + error.message);
        }
        throw new Error(strings.errors.apiError);
    }
};
