import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Mail,
  Calendar,
  ExternalLink,
  Send,
  MessageCircle,
  Clock,
  Globe,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  Phone,
  MapPin,
  Star,
  Zap,
  Shield,
  Award,
  Headphones,
  Video,
  FileText,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  project: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    project: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [formErrors, setFormErrors] =
    React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [focusedField, setFocusedField] =
    React.useState<string>("");

  // Real-time validation
  const validateField = (
    name: string,
    value: string,
  ): string => {
    switch (name) {
      case "name":
        return value.length < 2
          ? "Name must be at least 2 characters"
          : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? "Please enter a valid email address"
          : "";
      case "message":
        return value.length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const errors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(
        key,
        formData[key as keyof FormData],
      );
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time validation
    const error = validateField(name, value);
    if (error) {
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const contactMethods = [
    {
      icon: <ExternalLink className="w-5 h-5" />,
      title: t("contact.hireUpwork.title"),
      description: t("contact.hireUpwork.description"),
      action: t("contact.hireUpwork.action"),
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      onClick: () =>
        window.open(
          "https://www.upwork.com/freelancers/~your-profile",
          "_blank",
        ),
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: t("contact.bookCall.title"),
      description: t("contact.bookCall.description"),
      action: t("contact.bookCall.action"),
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      onClick: () =>
        window.open(
          "https://calendly.com/your-calendar-link",
          "_blank",
        ),
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "WhatsApp",
      description: "Quick chat for immediate questions",
      action: "Start Chat",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      onClick: () => {
        const message = encodeURIComponent(
          t("whatsapp.message"),
        );
        window.open(
          `https://wa.me/1234567890?text=${message}`,
          "_blank",
        );
      },
    },
  ];

  const projectTypes = [
    {
      value: "custom-elearning",
      label: t("contact.form.customElearning"),
      icon: <Video className="w-4 h-4" />,
    },
    {
      value: "course-redesign",
      label: t("contact.form.courseRedesign"),
      icon: <Settings className="w-4 h-4" />,
    },
    {
      value: "training-video",
      label: t("contact.form.trainingVideo"),
      icon: <Video className="w-4 h-4" />,
    },
    {
      value: "learning-materials",
      label: t("contact.form.learningMaterials"),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      value: "consultation",
      label: t("contact.form.consultation"),
      icon: <Headphones className="w-4 h-4" />,
    },
    {
      value: "other",
      label: t("contact.form.other"),
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const budgetRanges = [
    { value: "1000-5000", label: "$1,000 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-25000", label: "$10,000 - $25,000" },
    { value: "25000+", label: "$25,000+" },
    { value: "discuss", label: "Let's discuss" },
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP (Rush)" },
    { value: "1-2weeks", label: "1-2 weeks" },
    { value: "1month", label: "1 month" },
    { value: "2-3months", label: "2-3 months" },
    { value: "flexible", label: "Flexible" },
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      text: "Fast response within 2-4 hours",
    },
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      text: "100% confidential & secure",
    },
    {
      icon: <Award className="w-5 h-5 text-blue-500" />,
      text: "5+ years of proven experience",
    },
    {
      icon: <Globe className="w-5 h-5 text-purple-500" />,
      text: "Available worldwide",
    },
  ];

  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 max-w-2xl mx-auto shadow-2xl bg-white/90 backdrop-blur-sm">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <motion.h3
                  className="text-3xl mb-4 text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t("contact.success.title")}
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {t("contact.success.subtitle")}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        project: "",
                        budget: "",
                        timeline: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                    size="lg"
                    className="border-2"
                  >
                    {t("contact.success.sendAnother")}
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="lg"
                    onClick={() =>
                      window.open(
                        "https://calendly.com/your-calendar-link",
                        "_blank",
                      )
                    }
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {t("contact.success.bookCallInstead")}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-6 px-6 py-2 text-base">
            <Mail className="w-5 h-5 mr-2" />
            {t("contact.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 leading-tight">
            {t("contact.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Contact Methods & Info */}
          <motion.div
            className="xl:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl md:text-3xl mb-6 text-gray-900">
                {t("contact.howToReach")}
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group cursor-pointer"
                    onClick={method.onClick}
                  >
                    <Card className="p-5 hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          {method.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1 text-base">
                            {method.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-2 leading-snug">
                            {method.description}
                          </p>
                          <span className="text-blue-600 text-sm group-hover:text-blue-700 font-medium">
                            {method.action} →
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <h4 className="font-semibold mb-4 text-lg text-gray-900">
                Why Work With Me
              </h4>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature.icon}
                    <span className="text-gray-700 text-sm leading-snug">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            className="xl:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-10 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl mb-3 text-gray-900">
                  {t("contact.sendMessage")}
                </h3>
                <p className="text-gray-600 text-lg">
                  Tell me about your project and I'll get back
                  to you within 24 hours with a detailed
                  proposal.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-base font-medium flex items-center"
                    >
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      {t("contact.form.fullName")} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange(
                          "name",
                          e.target.value,
                        )
                      }
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      placeholder="John Doe"
                      required
                      className={`h-12 text-base transition-all ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-500"
                          : focusedField === "name"
                            ? "border-blue-500 shadow-lg"
                            : ""
                      }`}
                    />
                    <AnimatePresence>
                      {formErrors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center text-red-600 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-base font-medium flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {t("contact.form.email")} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange(
                          "email",
                          e.target.value,
                        )
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      placeholder="john@company.com"
                      required
                      className={`h-12 text-base transition-all ${
                        formErrors.email
                          ? "border-red-500 focus:border-red-500"
                          : focusedField === "email"
                            ? "border-blue-500 shadow-lg"
                            : ""
                      }`}
                    />
                    <AnimatePresence>
                      {formErrors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center text-red-600 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.email}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-base font-medium flex items-center"
                    >
                      <Building className="w-4 h-4 mr-2 text-gray-500" />
                      {t("contact.form.company")}
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange(
                          "company",
                          e.target.value,
                        )
                      }
                      placeholder="Your Company"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-base font-medium flex items-center"
                    >
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange(
                          "phone",
                          e.target.value,
                        )
                      }
                      placeholder="+1 (555) 123-4567"
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      {t("contact.form.projectType")} *
                    </Label>
                    <Select
                      value={formData.project}
                      onValueChange={(value) =>
                        handleInputChange("project", value)
                      }
                    >
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue
                          placeholder={t(
                            "contact.form.selectProjectType",
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                          >
                            <div className="flex items-center">
                              {type.icon}
                              <span className="ml-2">
                                {type.label}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      Budget Range
                    </Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) =>
                        handleInputChange("budget", value)
                      }
                    >
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem
                            key={range.value}
                            value={range.value}
                          >
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      Timeline
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) =>
                        handleInputChange("timeline", value)
                      }
                    >
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-base font-medium flex items-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                    {t("contact.form.projectDetails")} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange(
                        "message",
                        e.target.value,
                      )
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField("")}
                    placeholder={t(
                      "contact.form.projectDetailsPlaceholder",
                    )}
                    className={`min-h-[150px] text-base resize-none transition-all ${
                      formErrors.message
                        ? "border-red-500 focus:border-red-500"
                        : focusedField === "message"
                          ? "border-blue-500 shadow-lg"
                          : ""
                    }`}
                    required
                  />
                  <AnimatePresence>
                    {formErrors.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center text-red-600 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-base">
                      {t("contact.form.responseTime")}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      isSubmitting ||
                      Object.keys(formErrors).some(
                        (key) => formErrors[key],
                      )
                    }
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all px-8 py-6 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t("contact.form.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("contact.form.send")}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}