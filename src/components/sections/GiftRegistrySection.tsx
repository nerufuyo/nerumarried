'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { HoverAnimation } from '@/components/animations/HoverAnimation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Gift, 
  CreditCard, 
  Copy, 
  Check,
  Heart,
  QrCode
} from 'lucide-react';
import weddingData from '@/data/wedding.json';

export function GiftRegistrySection() {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string>('');

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section id="registry" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Gift className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t('registry.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              {t('registry.subtitle')}
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg text-gray-700 font-serif italic">
                {t('registry.description')}
              </p>
            </motion.div>
          </div>
        </ScrollAnimation>

        {/* Registry Items */}
        <div className="space-y-8">
          {weddingData.registry.map((item, index) => (
            <ScrollAnimation
              key={item.id}
              direction="up"
              delay={0.2 + index * 0.1}
            >
              <HoverAnimation>
                <Card variant="elegant">
                  <div className="text-center mb-8">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Gift className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                      {item.description}
                    </p>
                  </div>

                  {/* Bank Transfer Details */}
                  {item.accountDetails && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <CreditCard className="w-5 h-5 text-yellow-600" />
                        <h4 className="text-lg font-semibold text-gray-900">
                          {t('registry.bankDetails')}
                        </h4>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Bank Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">
                            Bank Name
                          </label>
                          <div className="flex items-center space-x-2">
                            <p className="flex-1 font-mono text-gray-900 bg-white p-3 rounded border">
                              {item.accountDetails.bankName}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(item.accountDetails!.bankName, 'bankName')}
                              className="p-2"
                            >
                              {copiedField === 'bankName' ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Account Number */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">
                            Account Number
                          </label>
                          <div className="flex items-center space-x-2">
                            <p className="flex-1 font-mono text-gray-900 bg-white p-3 rounded border">
                              {item.accountDetails.accountNumber}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(item.accountDetails!.accountNumber, 'accountNumber')}
                              className="p-2"
                            >
                              {copiedField === 'accountNumber' ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Account Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">
                            Account Name
                          </label>
                          <div className="flex items-center space-x-2">
                            <p className="flex-1 font-mono text-gray-900 bg-white p-3 rounded border">
                              {item.accountDetails.accountName}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(item.accountDetails!.accountName, 'accountName')}
                              className="p-2"
                            >
                              {copiedField === 'accountName' ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Copy Status Message */}
                      {copiedField && (
                        <motion.div
                          className="mt-4 flex items-center space-x-2 text-green-600"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Check className="w-4 h-4" />
                          <span className="text-sm">{t('registry.copied')}</span>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* QR Code */}
                  {item.qrCode && (
                    <div className="text-center">
                      <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center space-x-2">
                        <QrCode className="w-5 h-5 text-yellow-600" />
                        <span>Quick Payment</span>
                      </h5>
                      <div className="inline-block p-4 bg-white rounded-lg border-2 border-gray-200">
                        <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">QR Code</p>
                            <p className="text-gray-400 text-xs">Scan to pay</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        Scan with your mobile banking app
                      </p>
                    </div>
                  )}
                </Card>
              </HoverAnimation>
            </ScrollAnimation>
          ))}
        </div>

        {/* Thank You Message */}
        <ScrollAnimation direction="up" delay={0.6}>
          <Card variant="glass" className="mt-12 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 text-center">
            <motion.div
              className="space-y-4"
              whileHover={{ scale: 1.02 }}
            >
              <Heart className="w-12 h-12 text-yellow-600 mx-auto" />
              <h4 className="text-xl font-serif font-semibold text-gray-900">
                Thank You for Your Generosity
              </h4>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Your love, support, and presence at our wedding mean the world to us. 
                Any gift you choose to give will help us start our new life together with joy and gratitude.
              </p>
              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </motion.div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
}
