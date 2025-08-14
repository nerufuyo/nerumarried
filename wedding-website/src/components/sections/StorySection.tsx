'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { StaggerAnimation } from '@/components/animations/StaggerAnimation';
import { Card } from '@/components/ui/Card';
import { DateUtils } from '@/utils/date.utils';
import { Heart, Calendar } from 'lucide-react';
import weddingData from '@/data/wedding.json';

export function StorySection() {
  const { t } = useTranslation();

  return (
    <section id="story" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t('story.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('story.subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* How We Met Story */}
        <ScrollAnimation direction="up" delay={0.2}>
          <Card variant="elegant" className="mb-16 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                How We Met
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {weddingData.story.howWeMet}
              </p>
            </div>
          </Card>
        </ScrollAnimation>

        {/* Timeline */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              {t('story.timeline')}
            </h3>
          </div>
        </ScrollAnimation>

        {/* Timeline Items */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 h-full hidden lg:block"></div>

          <StaggerAnimation className="space-y-12">
            {weddingData.story.timeline.map((event, index) => (
              <motion.div
                key={event.date}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Timeline Content */}
                <div className="w-full lg:w-5/12 mb-6 lg:mb-0">
                  <Card
                    variant="elegant"
                    className={`${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    } hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-serif font-semibold text-gray-900">
                            {event.title}
                          </h4>
                          <span className="text-sm text-yellow-600 font-medium">
                            {DateUtils.formatDate(event.date, 'MMM yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Timeline Point */}
                <div className="hidden lg:block relative z-10">
                  <motion.div
                    className="w-6 h-6 bg-white border-4 border-yellow-500 rounded-full shadow-lg"
                    whileHover={{ scale: 1.3 }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>

                {/* Spacer for alignment */}
                <div className="w-full lg:w-5/12"></div>
              </motion.div>
            ))}
          </StaggerAnimation>
        </div>

        {/* Call to Action */}
        <ScrollAnimation direction="up" delay={0.6}>
          <div className="text-center mt-16">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg text-gray-600 font-serif italic max-w-2xl mx-auto">
                &quot;From our first meeting to this special day, every moment has been a beautiful chapter in our love story. We can&apos;t wait to begin this new adventure together as husband and wife.&quot;
              </p>
              <div className="mt-6 flex justify-center">
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
