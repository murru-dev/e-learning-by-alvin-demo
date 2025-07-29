import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  ExternalLink, 
  Eye,
  Award,
  Building,
  GraduationCap,
  Heart,
  Users,
  Clock,
  Star
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export function Portfolio() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const portfolioItems = [
    {
      title: t('portfolio.corporateSafety.title'),
      description: t('portfolio.corporateSafety.description'),
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "corporate",
      duration: "45 min",
      rating: 4.9,
      technologies: ["Storyline 360", "SCORM", "Interactive Videos"],
      client: t('portfolio.corporateSafety.client')
    },
    {
      title: t('portfolio.healthcareCompliance.title'),
      description: t('portfolio.healthcareCompliance.description'),
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "healthcare",
      duration: "30 min",
      rating: 5.0,
      technologies: ["Rise 360", "xAPI", "Mobile-first"],
      client: t('portfolio.healthcareCompliance.client')
    },
    {
      title: t('portfolio.salesTraining.title'),
      description: t('portfolio.salesTraining.description'),
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "corporate",
      duration: "60 min",
      rating: 4.8,
      technologies: ["Storyline 360", "Branching", "Analytics"],
      client: t('portfolio.salesTraining.client')
    },
    {
      title: t('portfolio.universityOnboarding.title'),
      description: t('portfolio.universityOnboarding.description'),
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "education",
      duration: "90 min",
      rating: 4.7,
      technologies: ["Articulate 360", "Gamification", "Progress Tracking"],
      client: t('portfolio.universityOnboarding.client')
    },
    {
      title: t('portfolio.patientCare.title'),
      description: t('portfolio.patientCare.description'),
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "healthcare",
      duration: "40 min",
      rating: 5.0,
      technologies: ["Rise 360", "Video Integration", "Assessment"],
      client: t('portfolio.patientCare.client')
    },
    {
      title: t('portfolio.leadership.title'),
      description: t('portfolio.leadership.description'),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "education",
      duration: "120 min",
      rating: 4.9,
      technologies: ["Storyline 360", "Feedback System", "Coaching Tools"],
      client: t('portfolio.leadership.client')
    }
  ];

  const categories = [
    { id: 'all', label: t('portfolio.allProjects'), icon: <Award className="w-4 h-4" /> },
    { id: 'corporate', label: t('portfolio.corporate'), icon: <Building className="w-4 h-4" /> },
    { id: 'healthcare', label: t('portfolio.healthcare'), icon: <Heart className="w-4 h-4" /> },
    { id: 'education', label: t('portfolio.education'), icon: <GraduationCap className="w-4 h-4" /> }
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  // WCAG 2.2: Keyboard navigation handler
  const handleKeyDown = (event: React.KeyboardEvent, categoryId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveCategory(categoryId);
    }
  };

  return (
    <section 
      id="portfolio" 
      className="py-20 bg-white"
      role="region"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-purple-100 text-purple-800 mb-4">
            <Eye className="w-4 h-4 mr-2" aria-hidden="true" />
            {t('portfolio.badge')}
          </Badge>
          <h2 
            id="portfolio-heading"
            className="text-4xl md:text-5xl mb-4 text-gray-900"
          >
            {t('portfolio.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Category Tabs - WCAG 2.2: Proper tab navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          role="tablist"
          aria-label={t('portfolio.title')}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeCategory === category.id 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category.id)}
              onKeyDown={(e) => handleKeyDown(e, category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`portfolio-panel-${category.id}`}
              id={`portfolio-tab-${category.id}`}
            >
              <span aria-hidden="true">{category.icon}</span>
              <span className="ml-2">{category.label}</span>
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid - WCAG 2.2: Proper structure and labels */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory}
          role="tabpanel"
          id={`portfolio-panel-${activeCategory}`}
          aria-labelledby={`portfolio-tab-${activeCategory}`}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                <div className="relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={`${item.title} - ${item.description}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-white text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={`${t('portfolio.preview')} ${item.title}`}
                      >
                        <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                        {t('portfolio.preview')}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={`${t('portfolio.preview')} ${item.title} - ${t('nav.contact')}`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">{t('nav.contact')}</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                    {t(`portfolio.${item.category}`)}
                  </Badge>
                  
                  {/* Rating */}
                  <div 
                    className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center"
                    aria-label={`${t('testimonials.averageRating')}: ${item.rating}`}
                  >
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
                    <span className="text-xs">{item.rating}</span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    {item.client}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
                    <span aria-label={`Duration: ${item.duration}`}>{item.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-1" role="list" aria-label="Technologies used">
                    {item.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs"
                        role="listitem"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={t('portfolio.viewFull')}
          >
            <ExternalLink className="w-5 h-5 mr-2" aria-hidden="true" />
            {t('portfolio.viewFull')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}