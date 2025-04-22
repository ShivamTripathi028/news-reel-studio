
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onReset: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onReset }) => {
  const handleDownload = () => {
    // Create a link element to download the video
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'news-video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-center">Your News Video is Ready!</h3>
      
      <div className="rounded-lg overflow-hidden mb-4 bg-black">
        <video 
          controls 
          className="w-full max-h-[500px] mx-auto"
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button 
          className="flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download Video
        </Button>
        
        <Button 
          variant="outline"
          onClick={onReset}
        >
          Create Another Video
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
