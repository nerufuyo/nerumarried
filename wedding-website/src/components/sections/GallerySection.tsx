'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { HoverAnimation } from '@/components/animations/HoverAnimation';
import { Button } from '@/components/ui/Button';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Heart
} from 'lucide-react';
import weddingData from '@/data/wedding.json';
import { GalleryImage } from '@/types/wedding.types';

export function GallerySection() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['all', 'engagement', 'prewedding', 'couple'];

  const galleryImages = weddingData.gallery as GalleryImage[];
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage?.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setLightboxImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Camera className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Category Filter */}
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {t(`gallery.categories.${category}`)}
              </Button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${selectedCategory}-${image.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <HoverAnimation scale={1.03}>
                  <div
                    className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(image, index)}
                  >
                    {/* Placeholder for actual image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                        <p className="text-yellow-800 font-medium">{image.alt}</p>
                        <p className="text-yellow-700 text-sm capitalize mt-1">{image.category}</p>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <Heart className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">View Photo</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </HoverAnimation>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No photos in this category yet.</p>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  onClick={closeLightbox}
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Navigation Buttons */}
                {filteredImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                      onClick={() => navigateLightbox('prev')}
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                      onClick={() => navigateLightbox('next')}
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </>
                )}

                {/* Image Container */}
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="aspect-square bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-serif font-bold text-yellow-800 mb-2">
                        {lightboxImage.alt}
                      </h3>
                      <p className="text-yellow-700 capitalize">
                        {lightboxImage.category} Photo
                      </p>
                    </div>
                  </div>
                  
                  {/* Image Counter */}
                  <p className="text-gray-500 text-sm">
                    {lightboxIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
