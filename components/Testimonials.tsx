import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  Star, 
  Quote, 
  ExternalLink, 
  Award,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      text: t('testimonials.testimonial1.text'),
      name: t('testimonials.testimonial1.name'),
      title: t('testimonials.testimonial1.title'),
      company: t('testimonials.testimonial1.company'),
      projectType: t('testimonials.testimonial1.projectType'),
      completionTime: t('testimonials.testimonial1.completionTime'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      text: t('testimonials.testimonial2.text'),
      name: t('testimonials.testimonial2.name'),
      title: t('testimonials.testimonial2.title'),
      company: t('testimonials.testimonial2.company'),
      projectType: t('testimonials.testimonial2.projectType'),
      completionTime: t('testimonials.testimonial2.completionTime'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      text: t('testimonials.testimonial3.text'),
      name: t('testimonials.testimonial3.name'),
      title: t('testimonials.testimonial3.title'),
      company: t('testimonials.testimonial3.company'),
      projectType: t('testimonials.testimonial3.projectType'),
      completionTime: t('testimonials.testimonial3.completionTime'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const stats = [
    { number: "98%", label: t('testimonials.clientSatisfaction'), sublabel: t('testimonials.basedOnUpwork') },
    { number: "4.9", label: t('testimonials.averageRating'), sublabel: t('testimonials.acrossProjects') },
    { number: "100%", label: t('testimonials.onTimeDelivery'), sublabel: t('testimonials.neverMissed') },
    { number: "50+", label: t('testimonials.projectsCompleted'), sublabel: t('testimonials.andCounting') }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      role="region"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-green-100 text-green-800 mb-4">
            <Award className="w-4 h-4 mr-2" aria-hidden="true" />
            {t('testimonials.badge')}
          </Badge>
          <h2 
            id="testimonials-heading"
            className="text-4xl md:text-5xl mb-4 text-gray-900"
          >
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid - WCAG 2.2: Proper structure and labels */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div 
                  className="text-3xl md:text-4xl text-blue-600 mb-2"
                  aria-label={`${stat.label}: ${stat.number}`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start">
                    <Quote className="w-8 h-8 text-blue-600 opacity-20" aria-hidden="true" />
                    <div className="flex items-center" aria-label={`${t('testimonials.averageRating')}: ${testimonial.rating} ${t('testimonials.averageRating').toLowerCase()}`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-600 leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Project Details */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span>{t('testimonials.projectType')}</span>
                      <span className="ml-1 text-gray-700">{testimonial.projectType}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span>{t('testimonials.completedIn')}</span>
                      <span className="ml-1 text-gray-700">{testimonial.completionTime}</span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage 
                        src={testimonial.image} 
                        alt={`${testimonial.name} - ${testimonial.title}`}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.title}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h3 className="text-2xl mb-2 text-gray-900">
              {t('testimonials.seeMoreReviews')}
            </h3>
            <p className="text-gray-600">
              {t('testimonials.checkProfile')}
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label={t('testimonials.visitProfile')}
          >
            <ExternalLink className="w-5 h-5 mr-2" aria-hidden="true" />
            {t('testimonials.visitProfile')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}