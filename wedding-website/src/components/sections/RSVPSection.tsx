'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ValidationUtils } from '@/utils/validation.utils';
import { 
  Heart, 
  Users, 
  Mail, 
  Phone, 
  User,
  MessageCircle,
  Music,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { RSVPFormData } from '@/types/wedding.types';

export function RSVPSection() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<RSVPFormData>();

  const attendanceValue = watch('attendance');

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    
    try {
      // Validate form data
      const validation = ValidationUtils.validateRSVPForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        attendance: data.attendance,
        guestCount: data.guestCount
      });

      if (!validation.isValid) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend
      console.log('RSVP Data:', data);
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('RSVP submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {t('rsvp.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('rsvp.subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <ScrollAnimation>
            <Card variant="elegant" className="mb-8 bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 text-green-800">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">{t('rsvp.submitSuccess')}</h3>
                  <p className="text-sm text-green-700">
                    We&apos;ll send you a confirmation email shortly.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollAnimation>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <ScrollAnimation>
            <Card variant="elegant" className="mb-8 bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 text-red-800">
                <AlertCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">{t('rsvp.submitError')}</h3>
                  <p className="text-sm text-red-700">
                    Please check your information and try again.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollAnimation>
        )}

        {/* RSVP Form */}
        <ScrollAnimation direction="up" delay={0.2}>
          <Card variant="elegant">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <User className="w-4 h-4 text-yellow-600" />
                    <label className="text-sm font-medium text-gray-700">
                      {t('rsvp.name')} *
                    </label>
                  </div>
                  <Input
                    {...register('name', { 
                      required: 'Name is required',
                      validate: (value) => ValidationUtils.isValidName(value) || 'Name must be at least 2 characters'
                    })}
                    placeholder="Enter your full name"
                    error={errors.name?.message}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-4 h-4 text-yellow-600" />
                    <label className="text-sm font-medium text-gray-700">
                      {t('rsvp.email')} *
                    </label>
                  </div>
                  <Input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      validate: (value) => ValidationUtils.isValidEmail(value) || 'Please enter a valid email'
                    })}
                    placeholder="Enter your email address"
                    error={errors.email?.message}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="w-4 h-4 text-yellow-600" />
                    <label className="text-sm font-medium text-gray-700">
                      {t('rsvp.phone')} *
                    </label>
                  </div>
                  <Input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      validate: (value) => ValidationUtils.isValidPhone(value) || 'Please enter a valid phone number'
                    })}
                    placeholder="Enter your phone number"
                    error={errors.phone?.message}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-4 h-4 text-yellow-600" />
                    <label className="text-sm font-medium text-gray-700">
                      {t('rsvp.guestCount')} *
                    </label>
                  </div>
                  <select
                    {...register('guestCount', { 
                      required: 'Please select number of guests',
                      valueAsNumber: true
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="">Select number of guests</option>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  {errors.guestCount && (
                    <p className="text-sm text-red-600">{errors.guestCount.message}</p>
                  )}
                </div>
              </div>

              {/* Attendance */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  {t('rsvp.attendance')} *
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {['yes', 'no', 'maybe'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        attendanceValue === option
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={option}
                        {...register('attendance', { required: 'Please select your attendance status' })}
                        className="sr-only"
                      />
                      <div className="flex-1 text-center">
                        <p className="font-medium text-gray-900">
                          {t(`rsvp.attendanceOptions.${option}`)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.attendance && (
                  <p className="text-sm text-red-600">{errors.attendance.message}</p>
                )}
              </div>

              {/* Additional Information */}
              {attendanceValue === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <MessageCircle className="w-4 h-4 text-yellow-600" />
                      <label className="text-sm font-medium text-gray-700">
                        {t('rsvp.dietaryRestrictions')}
                      </label>
                    </div>
                    <Textarea
                      {...register('dietaryRestrictions')}
                      placeholder="Let us know about any dietary restrictions or allergies"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <Music className="w-4 h-4 text-yellow-600" />
                      <label className="text-sm font-medium text-gray-700">
                        {t('rsvp.songRequest')}
                      </label>
                    </div>
                    <Input
                      {...register('songRequest')}
                      placeholder="Request a song for the reception"
                    />
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Heart className="w-4 h-4 text-yellow-600" />
                  <label className="text-sm font-medium text-gray-700">
                    {t('rsvp.message')}
                  </label>
                </div>
                <Textarea
                  {...register('message')}
                  placeholder="Share a special message with the couple"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="px-12"
                >
                  {isSubmitting ? 'Submitting...' : t('common.submit')}
                </Button>
              </div>
            </form>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
}
