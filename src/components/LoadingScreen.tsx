
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute top-0 w-16 h-16 border-4 border-brand-200 rounded-full"></div>
        <div className="absolute top-0 w-16 h-16 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">Generating your news video...</h3>
      <p className="text-center text-slate-500 max-w-md">
        We're processing your newspaper article and creating a video with voice narration. 
        This may take a few moments.
      </p>
    </div>
  );
};

export default LoadingScreen;
