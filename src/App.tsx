import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Scanner } from './components/Scanner';
import { ResultCard, type AnalysisResult } from './components/ResultCard';
import { SettingsModal } from './components/SettingsModal';
import { analyzeImage } from './services/aiService';
import { config } from './config/config';

function AppContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSlowResponse, setIsSlowResponse] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleImageSelect = async (file: File) => {
    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    // Reset previous result and error
    setResult(null);
    setError(null);
    setIsLoading(true);
    setIsSlowResponse(false);

    // Set timeout for slow response warning
    const slowResponseTimer = setTimeout(() => {
      setIsSlowResponse(true);
    }, config.slowResponseThreshold);

    try {
      // Call AI Service
      const analysis = await analyzeImage(file);
      setResult(analysis);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze artwork';
      setError(errorMessage);
      console.error('Analysis failed:', err);
    } finally {
      clearTimeout(slowResponseTimer);
      setIsLoading(false);
      setIsSlowResponse(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
    setIsSlowResponse(false);
  };

  return (
    <Layout onSettingsClick={() => setIsSettingsOpen(true)}>
      <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto">
        <Scanner
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
          onClear={handleClear}
        />

        <ResultCard
          isLoading={isLoading}
          result={result}
          error={error}
          isSlowResponse={isSlowResponse}
        />
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
