'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { DateUtils } from '@/utils/date.utils';
import { ChevronDown, Heart } from 'lucide-react';
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

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 opacity-20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: '100%',
              scale: 0
            }}
            animate={{
              y: '-100%',
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
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
            <h1 className="font-script text-4xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold leading-tight">
              {weddingData.couple.bride.name}
            </h1>
            <motion.div
              className="flex items-center justify-center my-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="w-12 h-px bg-yellow-400"></div>
              <Heart className="w-6 h-6 text-yellow-400 mx-4" />
              <div className="w-12 h-px bg-yellow-400"></div>
            </motion.div>
            <h1 className="font-script text-4xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold leading-tight">
              {weddingData.couple.groom.name}
            </h1>
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
              transition={{ delay: 2 }}
            >
              {[
                { value: days, label: 'Days' },
                { value: hours, label: 'Hours' },
                { value: minutes, label: 'Minutes' },
                { value: seconds, label: 'Seconds' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 border border-white border-opacity-20"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + index * 0.1 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-80">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollAnimation>
        )}

        {/* Scroll Indicator */}
        <ScrollAnimation direction="up" delay={1}>
          <motion.div
            className="flex flex-col items-center space-y-2 cursor-pointer"
            onClick={scrollToNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <p className="text-white text-sm opacity-80">
              {t('hero.scrollDown')}
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
