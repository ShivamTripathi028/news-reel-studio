
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ImageUpload';
import LanguageSelector, { Language } from '@/components/LanguageSelector';
import LoadingScreen from '@/components/LoadingScreen';
import VideoPlayer from '@/components/VideoPlayer';
import Header from '@/components/Header';

enum AppState {
  FORM,
  LOADING,
  VIDEO
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.FORM);
  const [image, setImage] = useState<File | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const { toast } = useToast();

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast({
        title: "Missing Image",
        description: "Please upload a newspaper image.",
        variant: "destructive"
      });
      return;
    }
    
    // Change to loading state
    setAppState(AppState.LOADING);
    
    // Create form data for API request
    const formData = new FormData();
    formData.append('image', image);
    formData.append('language', language);
    
    try {
      // Replace with actual API endpoint when available
      // Simulate API request with setTimeout
      setTimeout(() => {
        // This is a placeholder for the actual API call
        // In production, this would be:
        // const response = await fetch('/api/generate', {
        //   method: 'POST',
        //   body: formData
        // });
        // const data = await response.json();
        // setVideoUrl(data.videoUrl);
        
        // For demo purposes, we'll use a placeholder video URL
        setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
        setAppState(AppState.VIDEO);
        
        toast({
          title: "Video Generated",
          description: "Your news video is ready to play!",
        });
      }, 3000);
    } catch (error) {
      console.error('Error generating video:', error);
      toast({
        title: "Error",
        description: "Failed to generate video. Please try again.",
        variant: "destructive"
      });
      setAppState(AppState.FORM);
    }
  };

  const resetForm = () => {
    setImage(null);
    setLanguage('en');
    setVideoUrl('');
    setAppState(AppState.FORM);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return <LoadingScreen />;
      
      case AppState.VIDEO:
        return <VideoPlayer videoUrl={videoUrl} onReset={resetForm} />;
      
      case AppState.FORM:
      default:
        return (
          <form onSubmit={handleSubmit}>
            <ImageUpload onImageChange={handleImageChange} />
            <LanguageSelector 
              selectedLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={!image}
            >
              Generate Video
            </Button>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container py-6">
        <div className="max-w-xl mx-auto">
          <Card className="shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Convert Your Newspaper Article to Video</CardTitle>
              {appState === AppState.FORM && (
                <p className="text-muted-foreground mt-2">
                  Upload a newspaper image and select your preferred language to create a narrated video.
                </p>
              )}
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
