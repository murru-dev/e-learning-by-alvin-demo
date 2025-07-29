import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LanguageProvider,
  useLanguage,
} from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { WhatsAppButton } from "./components/WhatsAppButton";
import {
  ExampleDialog,
  ExampleDialogSimplified,
  ExampleDialogWithAutoAccessibility,
  ExampleDialogWithVisibleTitle,
  ExampleDialogWithVisuallyHidden,
  ExampleDialogAutomatic,
  ExampleSheet,
} from "./components/ExampleDialog";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  ExternalLink,
  ArrowUp,
  Calendar,
  Star,
  Users,
  Award,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  Heart,
} from "lucide-react";

function AppContent() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] =
    React.useState("home");
  const [showScrollTop, setShowScrollTop] =
    React.useState(false);

  // Scroll tracking
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "services",
        "portfolio",
        "testimonials",
        "about",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // WCAG 2.2: Keyboard navigation for scroll to top
  const handleScrollTopKeyDown = (
    event: React.KeyboardEvent,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToTop();
    }
  };

  const clientLogos = [
    {
      name: "NAO Now",
      url: "https://www.naonow.com/",
      description: "Digital Innovation",
    },
    {
      name: "Chameleon Associates",
      url: "https://chameleonassociates.com/",
      description: "Consulting",
    },
    {
      name: "LVL UP Academy",
      url: "https://thelvlupacademy.com/",
      description: "Education",
    },
    {
      name: "JJ Advocates",
      url: "https://www.jjadvocates.org/",
      description: "Legal Services",
    },
    {
      name: "Genius Publicity",
      url: "https://geniuspublicity.com/",
      description: "Marketing",
    },
    {
      name: "Esther Park Consulting",
      url: "https://www.estherparkconsulting.com/",
      description: "Consulting",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link - WCAG 2.2 requirement */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[100] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <Header
        activeSection={activeSection}
        onSectionClick={setActiveSection}
      />

      <main id="main-content" role="main">
        <Hero />

        {/* Clients Section */}
        <section
          className="py-16 bg-white relative overflow-hidden"
          role="region"
          aria-labelledby="clients-heading"
        >
          {/* Background decoration */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"
            aria-hidden="true"
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-4">
                <Award
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                />
                {t("clients.badge")}
              </Badge>
              <h2
                id="clients-heading"
                className="text-3xl md:text-4xl mb-4 text-gray-900"
              >
                {t("clients.title")}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t("clients.subtitle")}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {clientLogos.map((client, index) => (
                <motion.a
                  key={index}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-white">
                    <div className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {client.name}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {client.description}
                    </div>
                    <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Visit website →
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Success metrics - WCAG 2.2: Proper structure and labels */}
            <motion.div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              role="region"
              aria-labelledby="metrics-heading"
            >
              <h3 id="metrics-heading" className="sr-only">
                Success Metrics
              </h3>
              <div>
                <div
                  className="text-3xl md:text-4xl text-blue-600 mb-2"
                  aria-label={`${t("clients.learnersTrained")}: 500,000 or more`}
                >
                  500K+
                </div>
                <div className="text-gray-600 text-sm">
                  {t("clients.learnersTrained")}
                </div>
              </div>
              <div>
                <div
                  className="text-3xl md:text-4xl text-purple-600 mb-2"
                  aria-label={`${t("clients.projectsDelivered")}: 50 or more`}
                >
                  50+
                </div>
                <div className="text-gray-600 text-sm">
                  {t("clients.projectsDelivered")}
                </div>
              </div>
              <div>
                <div
                  className="text-3xl md:text-4xl text-green-600 mb-2"
                  aria-label={`${t("clients.clientSatisfaction")}: 98 percent`}
                >
                  98%
                </div>
                <div className="text-gray-600 text-sm">
                  {t("clients.clientSatisfaction")}
                </div>
              </div>
              <div>
                <div
                  className="text-3xl md:text-4xl text-orange-600 mb-2"
                  aria-label={`${t("clients.upworkRating")}: 5.0 out of 5`}
                >
                  5.0
                </div>
                <div className="text-gray-600 text-sm">
                  {t("clients.upworkRating")}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Services />
        <Portfolio />
        <Testimonials />
        <About />

        {/* CTA Section */}
        <section
          className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
          role="region"
          aria-labelledby="cta-heading"
        >
          {/* Background decoration */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 bg-white/10 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-white/20 text-white mb-6">
                <Star
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                />
                {t("cta.badge")}
              </Badge>

              <h2
                id="cta-heading"
                className="text-4xl md:text-5xl mb-6 text-white"
              >
                {t("cta.title")}
              </h2>

              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {t("cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                  aria-label={t("cta.hireUpwork")}
                >
                  <ExternalLink
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  {t("cta.hireUpwork")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 bg-[rgba(0,255,140,1)]"
                  aria-label={t("cta.bookCall")}
                >
                  <Calendar
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  {t("cta.bookCall")}
                </Button>
              </div>

              <p className="text-blue-200 mt-6 text-sm">
                {t("cta.footer")}
              </p>
            </motion.div>
          </div>
        </section>

        <Contact />

        {/* Example Dialogs for Testing Accessibility - Remove in production */}
        <section className="py-8 bg-gray-100 border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Dialog Accessibility Examples (Testing Only)
            </h3>
            <div className="flex flex-wrap gap-4">
              <ExampleDialog />
              <ExampleDialogSimplified />
              <ExampleDialogWithAutoAccessibility />
              <ExampleDialogWithVisibleTitle />
              <ExampleDialogWithVisuallyHidden />
              <ExampleDialogAutomatic />
              <ExampleSheet />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="bg-gray-900 text-white py-16"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                E-learning by Alvin
              </h3>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Visit Upwork Profile"
                >
                  <ExternalLink
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Email Contact"
                >
                  <Mail
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg">
                {t("footer.services")}
              </h4>
              <nav aria-label="Footer services navigation">
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#services"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.elearningDev")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.courseRedesign")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.multimediaContent")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.trainingMaterials")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <h4 className="mb-4 text-lg">
                {t("footer.quickLinks")}
              </h4>
              <nav aria-label="Footer quick links navigation">
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#portfolio"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.portfolio")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.testimonials")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.contact")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-1 py-1"
                    >
                      {t("footer.privacyPolicy")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm flex items-center">
              © 2025 E-learning by Alvin.{" "}
              {t("footer.madeWith")}{" "}
              <Heart
                className="w-4 h-4 mx-1 text-red-500"
                aria-hidden="true"
              />{" "}
              {t("footer.forBetterLearning")}.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="secondary">
                <Globe
                  className="w-3 h-3 mr-1"
                  aria-hidden="true"
                />
                {t("footer.availableWorldwide")}
              </Badge>
              <Badge variant="secondary">
                <Users
                  className="w-3 h-3 mr-1"
                  aria-hidden="true"
                />
                {t("footer.englishSpanish")}
              </Badge>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button - WCAG 2.2: Proper keyboard navigation */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            onKeyDown={handleScrollTopKeyDown}
            className="fixed bottom-36 right-6 sm:bottom-8 sm:right-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t("common.scrollToTop")}
            title={t("common.scrollToTop")}
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}