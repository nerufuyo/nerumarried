'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { FloatingElement } from '@/components/animations/FloatingElement';
import { Typewriter } from '@/components/animations/Typewriter';
import { DateUtils } from '@/utils/date.utils';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import weddingData from '@/data/wedding.json';

export function HeroSection() {
  const { t } = useTranslation();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(weddingData.wedding.date);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <FloatingElement
            key={`heart-${i}`}
            duration={6 + i}
            delay={i * 0.5}
            range={15}
            className={`absolute ${
              i % 2 === 0 ? 'left-' + (10 + i * 10) + '%' : 'right-' + (10 + i * 10) + '%'
            } ${
              i % 3 === 0 ? 'top-20' : i % 3 === 1 ? 'top-40' : 'top-60'
            }`}
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: i * 0.2, duration: 1 }}
            >
              <Heart className="w-4 h-4 text-yellow-400 opacity-30" />
            </motion.div>
          </FloatingElement>
        ))}

        {/* Floating Sparkles */}
        {[...Array(12)].map((_, i) => (
          <FloatingElement
            key={`sparkle-${i}`}
            duration={4 + i * 0.5}
            delay={i * 0.3}
            range={20}
            className={`absolute ${
              Math.random() > 0.5 ? 'left-' + Math.floor(Math.random() * 80 + 10) + '%' : 'right-' + Math.floor(Math.random() * 80 + 10) + '%'
            } top-${Math.floor(Math.random() * 60 + 20)}`}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 60 + 20}%`
            }}
          >
            <motion.div
              animate={{ 
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </motion.div>
          </FloatingElement>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Save the Date */}
        <ScrollAnimation direction="down">
          <motion.p
            className="text-yellow-400 text-sm sm:text-base font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t('hero.saveTheDate')}
          </motion.p>
        </ScrollAnimation>

        {/* Wedding of Text */}
        <ScrollAnimation direction="up" delay={0.2}>
          <motion.h1
            className="text-white text-lg sm:text-xl font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {t('hero.weddingOf')}
          </motion.h1>
        </ScrollAnimation>

        {/* Couple Names */}
        <ScrollAnimation direction="up" delay={0.4}>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="font-script text-4xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold leading-tight">
              <Typewriter 
                text={weddingData.couple.bride.name}
                delay={1.5}
                speed={0.1}
              />
            </div>
            <motion.div
              className="flex items-center justify-center my-6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <motion.div 
                className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 3, duration: 0.8 }}
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 3.5
                }}
              >
                <Heart className="w-8 h-8 text-yellow-400 mx-6 fill-current" />
              </motion.div>
              <motion.div 
                className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 3, duration: 0.8 }}
              />
            </motion.div>
            <div className="font-script text-4xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold leading-tight">
              <Typewriter 
                text={weddingData.couple.groom.name}
                delay={4}
                speed={0.1}
              />
            </div>
          </motion.div>
        </ScrollAnimation>

        {/* Wedding Date */}
        <ScrollAnimation direction="up" delay={0.6}>
          <motion.p
            className="text-white text-xl sm:text-2xl font-serif mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {DateUtils.formatDate(weddingData.wedding.date, 'EEEE, MMMM dd, yyyy')}
          </motion.p>
        </ScrollAnimation>

        {/* Countdown */}
        {!isExpired && (
          <ScrollAnimation direction="up" delay={0.8}>
            <motion.div
              className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5 }}
            >
              {[
                { value: days, label: 'Days' },
                { value: hours, label: 'Hours' },
                { value: minutes, label: 'Minutes' },
                { value: seconds, label: 'Seconds' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.2 + index * 0.1 }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 opacity-20"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1"
                      key={item.value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.value.toString().padStart(2, '0')}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-white opacity-80 font-medium">
                      {item.label}
                    </div>
                  </div>
                  
                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute top-1 right-1"
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollAnimation>
        )}

        {/* Scroll Indicator */}
        <ScrollAnimation direction="up" delay={1}>
          <motion.div
            className="flex flex-col items-center space-y-3 cursor-pointer group"
            onClick={scrollToNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.p 
              className="text-white text-sm opacity-80 group-hover:opacity-100 transition-opacity"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t('hero.scrollDown')}
            </motion.p>
            
            {/* Animated scroll indicator */}
            <div className="relative">
              <motion.div
                className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center"
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
              >
                <motion.div
                  className="w-1 h-3 bg-yellow-400 rounded-full mt-2"
                  animate={{ 
                    y: [0, 12, 0],
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
              
              {/* Additional bounce arrow */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5 text-yellow-400 opacity-70" />
              </motion.div>
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
