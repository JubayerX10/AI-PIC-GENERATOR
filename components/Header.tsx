import React from 'react';
import { CameraIcon } from './icons/CameraIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-card/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <CameraIcon className="w-7 h-7 sm:w-8 sm:h-8 text-brand-primary" />
        <h1 className="ml-3 text-xl sm:text-2xl font-bold text-gray-100 tracking-tight">
          Prompt to Picture AI
        </h1>
      </div>
    </header>
  );
};

export default Header;
