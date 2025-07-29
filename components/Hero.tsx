import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Award, 
  CheckCircle, 
  Play, 
  ExternalLink, 
  Headphones,
  Sparkles,
  Globe,
  Users
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Hero() {
  const { t } = useLanguage();

  const achievements = [
    { icon: <Users className="w-5 h-5" />, text: t('hero.achievement1') },
    { icon: <Globe className="w-5 h-5" />, text: t('hero.achievement2') },
    { icon: <Sparkles className="w-5 h-5" />, text: t('hero.achievement3') }
  ];

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div variants={itemVariants}>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-6">
                <Award className="w-4 h-4 mr-2" />
                {t('hero.badge')}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 leading-tight"
              variants={itemVariants}
            >
              {t('hero.title').split('Alvin')[0]}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Alvin
              </span>
              {t('hero.title').split('Alvin')[1]}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              {t('hero.subtitle').split('Articulate Storyline')[0]}
              <span className="font-semibold text-blue-600">Articulate Storyline</span>
              {t('hero.subtitle').split('Articulate Storyline')[1].split('Rise 360')[0]}
              <span className="font-semibold text-purple-600">Rise 360</span>
              {t('hero.subtitle').split('Rise 360')[1]}
            </motion.p>

            <motion.div 
              className="space-y-4 mb-8"
              variants={itemVariants}
            >
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-green-500 mr-3 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <span className="text-gray-700">{achievement.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                {t('hero.viewDemos')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                {t('hero.hireUpwork')}
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="E-learning developer workspace with laptop and training materials"
                className="rounded-2xl shadow-2xl w-full"
              />
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Headphones className="w-8 h-8" />
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">{t('hero.available')}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}