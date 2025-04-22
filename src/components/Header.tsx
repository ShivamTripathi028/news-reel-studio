
import React from 'react';
import { Newspaper } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 mb-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-6 w-6 text-brand-500" />
          <span className="text-xl font-semibold">NewsReelStudio</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
