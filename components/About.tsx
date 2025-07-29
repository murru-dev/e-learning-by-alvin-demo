import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Award,
  CheckCircle,
  Play,
  ExternalLink,
  Clock,
  Users,
  Globe,
  Calendar,
  ArrowRight,
  Headphones,
  BookOpen,
  Target,
  Heart,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  const { t } = useLanguage();

  const skills = [
    {
      name: t("about.skills.articulate"),
      icon: <BookOpen className="w-5 h-5" />,
      level: t("about.skills.expert"),
    },
    {
      name: t("about.skills.rise"),
      icon: <Target className="w-5 h-5" />,
      level: t("about.skills.expert"),
    },
    {
      name: t("about.skills.instructional"),
      icon: <GraduationCap className="w-5 h-5" />,
      level: t("about.skills.advanced"),
    },
    {
      name: t("about.skills.ai"),
      icon: <Headphones className="w-5 h-5" />,
      level: t("about.skills.advanced"),
    },
    {
      name: t("about.skills.scorm"),
      icon: <CheckCircle className="w-5 h-5" />,
      level: t("about.skills.expert"),
    },
    {
      name: t("about.skills.bilingual"),
      icon: <Globe className="w-5 h-5" />,
      level: t("about.skills.native"),
    },
  ];

  const industries = [
    {
      name: t("about.industries.healthcare"),
      icon: <Heart className="w-6 h-6" />,
      description: t("about.industries.healthcareDesc"),
    },
    {
      name: t("about.industries.corporate"),
      icon: <Briefcase className="w-6 h-6" />,
      description: t("about.industries.corporateDesc"),
    },
    {
      name: t("about.industries.education"),
      icon: <GraduationCap className="w-6 h-6" />,
      description: t("about.industries.educationDesc"),
    },
  ];

  const handleViewDemos = () => {
    const portfolioSection =
      document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHireUpwork = () => {
    window.open(
      "https://www.upwork.com/freelancers/~your-profile",
      "_blank",
    );
  };

  return (
    <section
      id="about"
      className="py-20 bg-white"
      role="region"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-blue-100 text-blue-800 mb-4 text-sm px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            {t("about.title")}
          </Badge>
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900"
          >
            {t("about.badge")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                {t("about.intro")}
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                {t("about.specialization")}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              {Array.isArray(t("about.achievements")) && t("about.achievements").map(
                (achievement: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      {achievement}
                    </span>
                  </div>
                ),
              )}

              {/* Quick Stats */}
              <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold mb-1">
                      5+
                    </div>
                    <div className="text-blue-100 text-xs">
                      {t("about.stats.yearsExp")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">
                      50+
                    </div>
                    <div className="text-blue-100 text-xs">
                      {t("about.stats.projects")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">
                      98%
                    </div>
                    <div className="text-blue-100 text-xs">
                      {t("about.stats.satisfaction")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">
                      24h
                    </div>
                    <div className="text-blue-100 text-xs">
                      {t("about.stats.response")}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={handleViewDemos}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all text-base px-8 py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                {t("about.cta.viewDemos")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleHireUpwork}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 text-base px-8 py-6"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                {t("about.cta.hireUpwork")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Alvin - E-learning developer and instructional designer"
                className="rounded-2xl shadow-2xl w-full aspect-[4/5] object-cover"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      5+ Years
                    </div>
                    <div className="text-gray-500">
                      Experience
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <div className="text-sm">
                    <div className="font-medium">Bilingual</div>
                    <div className="text-blue-100">EN/ES</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl text-center mb-12 text-gray-900">
            {t("about.skills.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-blue-600 mr-3">
                      {skill.icon}
                    </div>
                    <span className="font-medium text-gray-900 text-lg">
                      {skill.name}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {skill.level}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl text-center mb-12 text-gray-900">
            {t("about.industries.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {industry.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {industry.name}
                </h4>
                <p className="text-gray-600 text-base">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}