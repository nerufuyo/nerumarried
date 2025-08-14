'use client';

import { ReactNode } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { scrollY, scrollDirection } = useScrollPosition();
  const { currentLanguage, changeLanguage, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;
  const isNavVisible = scrollDirection === 'up' || scrollY < 100;

  const navigation = [
    { key: 'home', href: '#home' },
    { key: 'story', href: '#story' },
    { key: 'details', href: '#details' },
    { key: 'gallery', href: '#gallery' },
    { key: 'rsvp', href: '#rsvp' },
    { key: 'registry', href: '#registry' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white bg-opacity-95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: isNavVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="font-script text-2xl font-bold text-gradient-gold cursor-pointer"
              onClick={() => scrollToSection('#home')}
              whileHover={{ scale: 1.05 }}
            >
              S & M
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
                >
                  {t(`navigation.${item.key}`)}
                </button>
              ))}
              
              {/* Language Switcher */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <select
                  value={currentLanguage}
                  onChange={(e) => changeLanguage(e.target.value as 'en' | 'id')}
                  className="bg-transparent border-none focus:outline-none text-sm"
                >
                  <option value="en">EN</option>
                  <option value="id">ID</option>
                </select>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
                {navigation.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {t(`navigation.${item.key}`)}
                  </button>
                ))}
                <div className="flex items-center px-3 py-2 space-x-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <select
                    value={currentLanguage}
                    onChange={(e) => changeLanguage(e.target.value as 'en' | 'id')}
                    className="bg-transparent border-none focus:outline-none text-sm"
                  >
                    <option value="en">English</option>
                    <option value="id">Indonesia</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-script text-3xl font-bold text-gradient-gold mb-4">
              Sarah & Michael
            </div>
            <p className="text-gray-300 mb-6">
              {t('footer.thankYou')}
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-sm text-gray-400">
                {t('footer.madeWithLove')} © 2024
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
