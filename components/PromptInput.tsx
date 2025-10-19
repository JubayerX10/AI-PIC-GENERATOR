import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

type AspectRatio = '1:1' | '16:9' | '9:16';
const aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16'];

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, aspectRatio, setAspectRatio }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="w-full relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="A majestic lion wearing a crown, studio lighting..."
          className="w-full p-4 pr-28 sm:pr-36 bg-dark-card border border-gray-600 rounded-lg shadow-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 resize-none text-dark-text placeholder-gray-500"
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-md shadow-md hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="hidden sm:inline ml-2">Generating...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">Generate</span>
            </>
          )}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-3 space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-dark-subtext">Aspect Ratio:</span>
          <div className="flex items-center bg-dark-card border border-gray-600 rounded-lg p-1 space-x-1">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                disabled={isLoading}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 disabled:cursor-not-allowed ${
                  aspectRatio === ratio
                    ? 'bg-brand-primary text-white'
                    : 'text-dark-subtext hover:bg-gray-700'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
};

export default PromptInput;
