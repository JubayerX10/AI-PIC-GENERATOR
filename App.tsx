import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ImageDisplay from './components/ImageDisplay';
import Footer from './components/Footer';
import { generateImage } from './services/geminiService';

type AspectRatio = '1:1' | '16:9' | '9:16';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      const base64Image = await generateImage(prompt, aspectRatio);
      if (base64Image) {
        setImageUrl(`data:image/jpeg;base64,${base64Image}`);
      } else {
        throw new Error('The API did not return an image.');
      }
    } catch (err) {
      console.error('Image generation failed:', err);
      setError('Sorry, something went wrong while creating your image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
          {error && (
            <div className="w-full bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700 text-center animate-fade-in">
              {error}
            </div>
          )}
          <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} prompt={prompt} aspectRatio={aspectRatio} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
