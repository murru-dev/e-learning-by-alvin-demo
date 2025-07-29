import React from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Calendar, Menu, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface HeaderProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export function Header({
  activeSection,
  onSectionClick,
}: HeaderProps) {
  const { t } = useLanguage();
  const [isKeyboardUser, setIsKeyboardUser] =
    React.useState(false);

  const navItems = [
    { id: "services", label: t("nav.services") },
    { id: "portfolio", label: t("nav.portfolio") },
    { id: "testimonials", label: t("nav.testimonials") },
    { id: "about", label: t("nav.about") },
    { id: "contact", label: t("nav.contact") },
  ];

  // Detect keyboard vs mouse interaction
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(
        "mousedown",
        handleMouseDown,
      );
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onSectionClick(sectionId);
    }
  };

  const handleBookCall = () => {
    window.open(
      "https://calendly.com/your-calendar-link",
      "_blank",
    );
  };

  const handleUpworkClick = () => {
    window.open(
      "https://www.upwork.com/freelancers/~your-upwork-profile",
      "_blank",
    );
  };

  // WCAG 2.2: Keyboard navigation handler
  const handleKeyDown = (
    event: React.KeyboardEvent,
    sectionId: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex flex-col cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection("home")}
          >
            <h1 className="text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              E-learning by Alvin
            </h1>
          </motion.div>

          {/* Desktop Navigation - WCAG 2.2: Proper navigation structure */}
          <nav
            className="hidden lg:flex items-center space-x-4"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                className={`text-gray-700 hover:text-blue-600 transition-colors relative focus:outline-none rounded-md px-2 py-2 text-base ${
                  activeSection === item.id
                    ? "text-blue-600 font-medium"
                    : ""
                } ${
                  isKeyboardUser
                    ? "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-current={
                  activeSection === item.id ? "page" : undefined
                }
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSelector />

            {/* Upwork Button */}
            <Button
              onClick={handleUpworkClick}
              variant="outline"
              className={`border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 shadow-sm focus:outline-none text-base px-4 py-2 ${
                isKeyboardUser
                  ? "focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  : ""
              }`}
              aria-label={t("nav.hireUpwork")}
            >
              <ExternalLink
                className="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {t("nav.upwork")}
            </Button>

            {/* Book Call Button */}
            <Button
              onClick={handleBookCall}
              className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg focus:outline-none text-base px-5 py-2 ${
                isKeyboardUser
                  ? "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  : ""
              }`}
              aria-label={t("nav.bookCall")}
            >
              <Calendar
                className="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {t("nav.bookCall")}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSelector />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`focus:outline-none ${
                    isKeyboardUser
                      ? "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      : ""
                  }`}
                  aria-label="Open navigation menu"
                >
                  <Menu
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                role="dialog"
                aria-labelledby="mobile-menu-title"
                className="w-80"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  <h2
                    id="mobile-menu-title"
                    className="sr-only"
                  >
                    Navigation Menu
                  </h2>

                  {/* Mobile Navigation */}
                  <nav
                    role="navigation"
                    aria-label="Mobile navigation"
                    className="space-y-2"
                  >
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        onKeyDown={(e) =>
                          handleKeyDown(e, item.id)
                        }
                        className={`text-left text-gray-700 hover:text-blue-600 transition-colors p-3 w-full focus:outline-none rounded-md border-l-4 hover:border-l-blue-600 hover:bg-blue-50 text-base ${
                          activeSection === item.id
                            ? "border-l-blue-600 bg-blue-50 text-blue-600 font-medium"
                            : "border-l-transparent"
                        } ${
                          isKeyboardUser
                            ? "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            : ""
                        }`}
                        aria-current={
                          activeSection === item.id
                            ? "page"
                            : undefined
                        }
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  {/* Mobile CTAs */}
                  <div className="pt-6 border-t border-gray-200 space-y-3">
                    {/* Mobile Upwork Button */}
                    <Button
                      onClick={handleUpworkClick}
                      variant="outline"
                      className={`w-full border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 focus:outline-none text-base py-3 ${
                        isKeyboardUser
                          ? "focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          : ""
                      }`}
                      aria-label={t("nav.hireUpwork")}
                    >
                      <ExternalLink
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                      {t("nav.hireUpwork")}
                    </Button>

                    {/* Mobile Book Call Button */}
                    <Button
                      onClick={handleBookCall}
                      className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white focus:outline-none text-base py-3 ${
                        isKeyboardUser
                          ? "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          : ""
                      }`}
                      aria-label={t("nav.bookCall")}
                    >
                      <Calendar
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                      {t("nav.bookCall")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}