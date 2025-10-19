
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg py-4 mt-8 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center text-dark-subtext text-sm">
        <p>Powered by Google's Gemini API</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Prompt to Picture Generator. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
