
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type Language = 'en' | 'hi' | 'mr' | 'pa' | 'ta';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = [
  { id: 'en', name: 'English' },
  { id: 'hi', name: 'Hindi' },
  { id: 'mr', name: 'Marathi' },
  { id: 'pa', name: 'Punjabi' },
  { id: 'ta', name: 'Tamil' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Select Voice Language</label>
      <RadioGroup
        value={selectedLanguage}
        onValueChange={(value) => onLanguageChange(value as Language)}
        className="grid grid-cols-2 gap-2 sm:grid-cols-5"
      >
        {languages.map((language) => (
          <div 
            key={language.id}
            className="flex items-center space-x-2 border rounded-md px-3 py-2 hover:border-brand-300 transition-colors"
          >
            <RadioGroupItem 
              value={language.id} 
              id={language.id}
              className="text-brand-500"
            />
            <Label htmlFor={language.id} className="cursor-pointer">
              {language.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default LanguageSelector;
