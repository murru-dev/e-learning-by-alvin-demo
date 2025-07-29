import React, { useState } from 'react';
import { Button } from './ui/button';
import { useLanguage, availableLanguages } from '../contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = React.useState(false);

  // Detect keyboard vs mouse interaction
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const currentLanguage = availableLanguages.find(lang => lang.code === language);
  
  const handleLanguageSelect = (langCode: typeof language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  // WCAG 2.2: Keyboard navigation handler
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleItemKeyDown = (event: React.KeyboardEvent, langCode: typeof language) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLanguageSelect(langCode);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-language-selector]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" data-language-selector>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`flex items-center space-x-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all focus:outline-none ${
            isKeyboardUser ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : ''
          }`}
          aria-label={`Current language: ${currentLanguage?.name}. Click to change language`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className="font-medium">
            {currentLanguage?.code.toUpperCase()}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3" aria-hidden="true" />
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px] py-1"
            role="menu"
            aria-labelledby="language-menu"
          >
            {availableLanguages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code as typeof language)}
                onKeyDown={(e) => handleItemKeyDown(e, lang.code as typeof language)}
                className={`w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-blue-50 transition-colors focus:outline-none ${
                  isKeyboardUser ? 'focus:ring-2 focus:ring-blue-500 focus:ring-inset' : ''
                } ${
                  language === lang.code
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700'
                }`}
                role="menuitem"
                aria-current={language === lang.code ? 'true' : 'false'}
                whileHover={{ backgroundColor: 'rgb(239 246 255)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium">
                  {lang.code.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  {lang.name}
                </span>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}