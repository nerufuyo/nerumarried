'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { HoverAnimation } from '@/components/animations/HoverAnimation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DateUtils } from '@/utils/date.utils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Navigation, 
  Shirt,
  Download
} from 'lucide-react';
import weddingData from '@/data/wedding.json';

export function WeddingDetailsSection() {
  const { t } = useTranslation();

  const handleAddToCalendar = (eventType: 'ceremony' | 'reception') => {
    const event = weddingData.wedding[eventType];
    const calendarUrl = DateUtils.createCalendarUrl({
      title: `${weddingData.couple.bride.name} & ${weddingData.couple.groom.name} - ${eventType === 'ceremony' ? 'Wedding Ceremony' : 'Reception'}`,
      startDate: weddingData.wedding.date,
      startTime: event.time,
      endTime: eventType === 'ceremony' ? '10:30' : '16:00',
      location: `${event.venue}, ${event.address}`,
      description: `Join us for our special day!`
    });
    
    window.open(calendarUrl, '_blank');
  };

  const handleGetDirections = (address: string) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const events = [
    {
      key: 'ceremony',
      icon: Calendar,
      gradient: 'from-yellow-400 to-yellow-600',
      data: weddingData.wedding.ceremony
    },
    {
      key: 'reception',
      icon: Clock,
      gradient: 'from-yellow-500 to-yellow-700',
      data: weddingData.wedding.reception
    }
  ];

  return (
    <section id="details" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t('details.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mark your calendars and join us for our special celebration
            </p>
          </div>
        </ScrollAnimation>

        {/* Wedding Date */}
        <ScrollAnimation direction="up" delay={0.2}>
          <Card variant="elegant" className="mb-12 max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-yellow-600" />
                <span className="text-lg font-medium text-gray-900">
                  {DateUtils.formatDate(weddingData.wedding.date, 'EEEE, MMMM dd, yyyy')}
                </span>
              </div>
              <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center space-x-3">
                <Shirt className="w-6 h-6 text-yellow-600" />
                <span className="text-lg font-medium text-gray-900">
                  {t('details.dressCode')}: {t('details.dressCodeText')}
                </span>
              </div>
            </div>
          </Card>
        </ScrollAnimation>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <ScrollAnimation
              key={event.key}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={0.3 + index * 0.1}
            >
              <HoverAnimation>
                <Card variant="elegant" className="h-full">
                  <div className="text-center mb-6">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${event.gradient} rounded-full mb-4`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <event.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                      {t(`details.${event.key}`)}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Time */}
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{t('details.time')}</p>
                        <p className="text-gray-600">
                          {DateUtils.formatTime(event.data.time)}
                        </p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{t('details.venue')}</p>
                        <p className="text-gray-600">{event.data.venue}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start space-x-3">
                      <Navigation className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{t('details.address')}</p>
                        <p className="text-gray-600">{event.data.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCalendar(event.key as 'ceremony' | 'reception')}
                      className="flex-1 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t('details.addToCalendar')}</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleGetDirections(event.data.address)}
                      className="flex-1 flex items-center justify-center space-x-2"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{t('details.getDirections')}</span>
                    </Button>
                  </div>
                </Card>
              </HoverAnimation>
            </ScrollAnimation>
          ))}
        </div>

        {/* Additional Information */}
        <ScrollAnimation direction="up" delay={0.6}>
          <Card variant="glass" className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                Important Information
              </h4>
              <div className="grid sm:grid-cols-2 gap-6 text-left">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Parking</h5>
                  <p className="text-gray-600 text-sm">
                    Complimentary valet parking will be available at both venues.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Photography</h5>
                  <p className="text-gray-600 text-sm">
                    We&apos;ll have professional photographers, but feel free to take pictures during the reception.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Gift Policy</h5>
                  <p className="text-gray-600 text-sm">
                    Your presence is our greatest gift, but if you wish to give, please see our registry section.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Contact</h5>
                  <p className="text-gray-600 text-sm">
                    For any questions, please contact us or our wedding coordinator.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
}
