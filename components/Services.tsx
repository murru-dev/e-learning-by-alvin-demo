import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Video, 
  BookOpen, 
  RefreshCw,
  ArrowRight,
  Zap,
  Target,
  Users,
  Globe,
  Clock,
  CheckCircle,
  Layers,
  Smartphone,
  Award,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

// Service Modal Component
function ServiceModal({ serviceIndex }: { serviceIndex: number }) {
  const { t } = useLanguage();
  
  const serviceKey = `services.service${serviceIndex}`;
  const modalData = t(`${serviceKey}.modal`);
  
  const getServiceIcon = (index: number) => {
    const icons = [
      <Brain className="w-6 h-6" />,
      <Video className="w-6 h-6" />,
      <BookOpen className="w-6 h-6" />,
      <RefreshCw className="w-6 h-6" />
    ];
    return icons[index - 1];
  };

  const getServiceColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600", 
      "from-green-500 to-green-600",
      "from-orange-500 to-orange-600"
    ];
    return colors[index - 1];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-r ${getServiceColor(serviceIndex)} rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
          {getServiceIcon(serviceIndex)}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {modalData.title}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          {modalData.description}
        </p>
      </div>

      {/* Overview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Overview
        </h4>
        <p className="text-gray-700 leading-relaxed">
          {modalData.overview}
        </p>
      </div>

      {/* Dynamic Content based on service */}
      {modalData.process && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.process.title}
          </h4>
          <div className="space-y-3">
            {modalData.process.steps.map((step: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.capabilities && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.capabilities.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.capabilities.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.materials && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.materials.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.materials.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.benefits && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.benefits.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.benefits.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <Award className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.useCases && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.useCases.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.useCases.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.features && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.features.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.features.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.improvements && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.improvements.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.improvements.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <Award className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.deliverables && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.deliverables.title}
          </h4>
          <div className="space-y-2">
            {modalData.deliverables.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.applications && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.applications.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.applications.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.technology && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.technology.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.technology.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalData.beforeAfter && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-blue-600" />
            {modalData.beforeAfter.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modalData.beforeAfter.items.map((item: string, index: number) => (
              <div key={index} className="flex items-start">
                <ArrowRight className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center pt-6 border-t">
        <p className="text-lg font-medium text-gray-900 mb-4">
          {modalData.cta}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.open('https://www.upwork.com/freelancers/~01234567890abcdef', '_blank')}
          >
            Hire on Upwork
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      features: t('services.service1.features')
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      features: t('services.service2.features')
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      features: t('services.service3.features')
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      features: t('services.service4.features')
    }
  ];

  return (
    <section 
      id="services" 
      className="py-20 bg-gray-50"
      role="region"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-blue-100 text-blue-800 mb-4">
            <Target className="w-4 h-4 mr-2" aria-hidden="true" />
            {t('services.badge')}
          </Badge>
          <h2 
            id="services-heading"
            className="text-4xl md:text-5xl mb-4 text-gray-900"
          >
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card 
                className="h-full hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                role="article"
                aria-labelledby={`service-${index}-title`}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} aria-hidden="true"></div>
                <CardHeader className="pb-4">
                  <div 
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <CardTitle 
                    id={`service-${index}-title`}
                    className="text-xl group-hover:text-blue-600 transition-colors"
                  >
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <h4 className="sr-only">Key Features</h4>
                    <ul className="space-y-2" role="list">
                      {service.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" aria-hidden="true"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline - visible outside modal */}
                  <div className="bg-white border-2 border-gray-100 rounded-lg p-3 mt-4 group-hover:border-blue-200 transition-colors">
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {t(`services.service${index + 1}.modal.timeline`)}
                      </span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.button 
                        className="flex items-center text-blue-600 cursor-pointer group-hover:text-blue-700 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 -m-1"
                        whileHover={{ x: 5 }}
                        aria-label={`${t('services.learnMore')} about ${service.title}`}
                        onClick={() => setSelectedService(index)}
                      >
                        <span className="text-sm">{t('services.learnMore')}</span>
                        <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                      </motion.button>
                    </DialogTrigger>
                    <DialogContent 
                      className="max-w-4xl max-h-[80vh] overflow-y-auto"
                      title={t(`services.service${index + 1}.modal.title`)}
                      description={t(`services.service${index + 1}.modal.description`)}
                    >
                      <ServiceModal serviceIndex={index + 1} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section - WCAG 2.2: Proper structure and labels */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          role="region"
          aria-labelledby="stats-heading"
        >
          <h3 id="stats-heading" className="sr-only">Success Statistics</h3>
          <div className="text-center">
            <div 
              className="text-4xl mb-2 text-blue-600"
              aria-label={`${t('services.projectsCompleted')}: 50 or more`}
            >
              50+
            </div>
            <div className="text-gray-600">{t('services.projectsCompleted')}</div>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl mb-2 text-purple-600"
              aria-label={`${t('services.happyClients')}: 15 or more`}
            >
              15+
            </div>
            <div className="text-gray-600">{t('services.happyClients')}</div>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl mb-2 text-green-600"
              aria-label={`${t('services.languagesSupported')}: 2`}
            >
              2
            </div>
            <div className="text-gray-600">{t('services.languagesSupported')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}