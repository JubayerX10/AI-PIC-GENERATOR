import React from 'react';
import { LoaderIcon } from './icons/LoaderIcon';
import { ImageIcon } from './icons/ImageIcon';
import { DownloadIcon } from './icons/DownloadIcon';

type AspectRatio = '1:1' | '16:9' | '9:16';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
  aspectRatio: AspectRatio;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, prompt, aspectRatio }) => {
  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case '16:9':
        return 'aspect-video';
      case '9:16':
        return 'aspect-[9/16]';
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  const getDownloadFilename = (promptText: string): string => {
    if (!promptText) return 'generated-image.jpeg';
    const sanitized = promptText.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${sanitized.slice(0, 50)}.jpeg`;
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = getDownloadFilename(prompt);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const aspectRatioClass = getAspectRatioClass(aspectRatio);

  if (isLoading) {
    return (
      <div className={`w-full max-w-lg ${aspectRatioClass} bg-dark-card border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-4 sm:p-8 animate-pulse-slow`}>
        <LoaderIcon className="w-12 h-12 sm:w-16 sm:h-16 text-brand-primary animate-spin-slow" />
        <p className="mt-4 text-md sm:text-lg font-medium text-dark-subtext">Creating your vision...</p>
        <p className="mt-2 text-xs sm:text-sm text-center text-gray-500">The AI is working its magic. This can take a moment.</p>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className={`group relative w-full max-w-lg ${aspectRatioClass} bg-dark-card rounded-lg shadow-2xl overflow-hidden animate-fade-in`}>
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover"
        />
         <button
          onClick={handleDownload}
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-black/60 backdrop-blur-sm text-white font-semibold rounded-md shadow-md opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all duration-300 text-sm"
          aria-label="Download image"
        >
          <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Download
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg ${aspectRatioClass} bg-dark-card border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center text-center p-4 sm:p-8 transition-all duration-300`}>
      <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold text-dark-subtext">Your Image Will Appear Here</h3>
      <p className="mt-2 text-sm sm:text-base text-gray-500">
        Enter a prompt and choose an aspect ratio to create a unique image.
      </p>
    </div>
  );
};

export default ImageDisplay;
