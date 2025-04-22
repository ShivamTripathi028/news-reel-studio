
import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  }, []);

  const handleFile = (file: File) => {
    // Check if file is an image (JPEG or PNG)
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      alert('Please upload a JPEG or PNG image.');
      return;
    }
    
    setFileName(file.name);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const imgSrc = e.target.result as string;
        setImagePreview(imgSrc);
        
        // Get image dimensions
        const img = new Image();
        img.onload = () => {
          setDimensions({
            width: img.width,
            height: img.height
          });
        };
        img.src = imgSrc;
      }
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onImageChange(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    setFileName(null);
    setDimensions(null);
    if (inputRef.current) inputRef.current.value = '';
    onImageChange(null);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Upload Newspaper Image</label>
      
      {!imagePreview ? (
        <div 
          className={`drop-zone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-2" />
          <p className="mb-2 text-sm text-slate-600">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-slate-500">
            Supports: JPEG, PNG
          </p>
          <input
            ref={inputRef}
            type="file"
            className="file-upload-btn"
            accept="image/jpeg,image/png"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-2 right-2 bg-white"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex flex-col items-center">
            <div className="relative w-full max-h-64 overflow-hidden rounded-md mb-3">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="mx-auto max-h-64 object-contain"
              />
            </div>
            
            <div className="w-full text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate max-w-[200px]">
                  {fileName}
                </span>
                {dimensions && (
                  <span className="text-xs text-slate-500">
                    {dimensions.width} × {dimensions.height}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
