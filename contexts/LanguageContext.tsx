import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
] as const;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document language attribute for SEO
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key; // Return key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Translations object
const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      about: "About",
      contact: "Contact",
      bookCall: "Book a Call",
      upwork: "Upwork",
      hireUpwork: "Hire on Upwork"
    },
    hero: {
      badge: "Trusted E-learning Professional",
      title: "Hi, I'm Alvin — E-learning Developer & Instructional Designer",
      subtitle: "I create interactive training solutions using Articulate Storyline, Rise 360, and AI tools.",
      achievement1: "Trusted by DIRECTV, AT&T, VRIO",
      achievement2: "Specialized in corporate, education & healthcare training",
      achievement3: "Bilingual: English & Spanish",
      viewDemos: "View My Demos",
      hireUpwork: "Hire Me on Upwork",
      available: "Available for projects"
    },
    clients: {
      badge: "Trusted Partners",
      title: "Trusted by Global Brands",
      subtitle: "Delivering exceptional e-learning solutions for industry leaders across telecommunications, media, and technology sectors",
      learnersTrained: "Learners Trained",
      projectsDelivered: "Projects Delivered",
      clientSatisfaction: "Client Satisfaction",
      upworkRating: "Upwork Rating"
    },
    services: {
      badge: "My Expertise",
      title: "What I Can Help You With",
      subtitle: "Instructional Design & Interactive Training Solutions that drive real results",
      service1: {
        title: "Custom E-learning Development",
        description: "Interactive courses with Articulate Storyline & SCORM compliance for seamless LMS integration",
        features: ["SCORM Compliant", "Interactive Elements", "Multi-device Support"],
        modal: {
          title: "Custom E-learning Development",
          description: "Transform your training materials into engaging, interactive learning experiences that drive real results and improve knowledge retention.",
          overview: "I create fully custom e-learning courses from scratch using industry-leading tools like Articulate Storyline 360. Each course is designed with your specific learning objectives, brand identity, and target audience in mind.",
          process: {
            title: "My Development Process",
            steps: [
              "Discovery & Analysis: Understanding your goals, audience, and content",
              "Instructional Design: Creating learning paths and interactive scenarios", 
              "Visual Development: Custom graphics, animations, and branding",
              "SCORM Integration: Ensuring compatibility with your LMS",
              "Testing & Refinement: Quality assurance and user testing",
              "Delivery & Support: Full course deployment and ongoing support"
            ]
          },
          benefits: {
            title: "Key Benefits",
            items: [
              "Improved knowledge retention through interactive elements",
              "Reduced training costs compared to traditional methods",
              "Scalable solution that grows with your organization",
              "Detailed analytics and progress tracking",
              "Mobile-responsive design for learning on-the-go",
              "Multilingual capabilities (English/Spanish)"
            ]
          },
          deliverables: {
            title: "What You'll Receive",
            items: [
              "Complete SCORM-compliant course package",
              "Source files for future updates",
              "Implementation guide and documentation",
              "User training materials",
              "30-day post-delivery support"
            ]
          },
          timeline: "Typical timeline: 2-6 weeks depending on complexity",
          cta: "Ready to create your custom course?"
        }
      },
      service2: {
        title: "Multimedia Content & Video",
        description: "AI voiceover, animated explainers, and scenario-based demos that engage learners",
        features: ["AI Voiceover", "Animations", "Scenario-based"],
        modal: {
          title: "Multimedia Content & Video Production",
          description: "Bring your training content to life with professional multimedia elements that capture attention and enhance learning outcomes.",
          overview: "I specialize in creating high-quality multimedia content including AI-powered voiceovers, animated explainer videos, and interactive scenario-based learning modules that make complex topics easy to understand.",
          capabilities: {
            title: "Multimedia Capabilities", 
            items: [
              "AI Voiceover Generation: Natural-sounding narration in English and Spanish",
              "2D Animations: Custom graphics and motion graphics",
              "Screen Recordings: Software tutorials and product demos",
              "Interactive Scenarios: Branching storylines and decision trees",
              "Video Editing: Professional post-production and effects",
              "Audio Enhancement: Background music and sound effects"
            ]
          },
          useCases: {
            title: "Perfect For",
            items: [
              "Product demonstrations and software training",
              "Compliance training with real-world scenarios",
              "Onboarding programs for new employees",
              "Safety training with visual demonstrations",
              "Sales training with customer interaction scenarios",
              "Medical procedures and healthcare protocols"
            ]
          },
          technology: {
            title: "Tools & Technology",
            items: [
              "ElevenLabs AI for professional voiceovers",
              "Adobe Creative Suite for video production",
              "Articulate Storyline for interactive elements",
              "Vyond for animated characters and scenes",
              "Camtasia for screen recordings and tutorials"
            ]
          },
          timeline: "Typical timeline: 1-4 weeks depending on scope",
          cta: "Let's create engaging multimedia content!"
        }
      },
      service3: {
        title: "Training Materials",
        description: "Professional PDF guides, job aids, workbooks and handouts for comprehensive learning",
        features: ["PDF Guides", "Job Aids", "Workbooks"],
        modal: {
          title: "Training Materials Development",
          description: "Comprehensive learning resources that support and reinforce your training programs with professional design and clear instructional content.",
          overview: "I create a complete suite of training materials that complement your e-learning courses or work as standalone resources. Each material is designed with adult learning principles and professional presentation standards.",
          materials: {
            title: "Types of Materials",
            items: [
              "Instructor Guides: Comprehensive facilitation materials with timing and activities",
              "Participant Workbooks: Interactive exercises and note-taking spaces", 
              "Quick Reference Guides: Essential information for on-the-job support",
              "Job Aids: Step-by-step procedures and checklists",
              "Assessment Tools: Quizzes, evaluations, and competency checks",
              "Infographics: Visual summaries of key concepts and processes"
            ]
          },
          features: {
            title: "Design Features",
            items: [
              "Professional branding and consistent visual identity",
              "Accessible design following WCAG 2.2 guidelines", 
              "Print-ready and digital formats available",
              "Interactive PDF elements (forms, bookmarks, links)",
              "Multilingual versions (English/Spanish)",
              "Mobile-friendly layouts for tablet viewing"
            ]
          },
          applications: {
            title: "Common Applications",
            items: [
              "New employee onboarding packages",
              "Compliance training documentation",
              "Product knowledge references",
              "Safety procedure manuals",
              "Customer service scripts and guidelines",
              "Technical troubleshooting guides"
            ]
          },
          timeline: "Typical timeline: 1-3 weeks per material set",
          cta: "Need professional training materials?"
        }
      },
      service4: {
        title: "Course Redesign",
        description: "Modernize outdated content into engaging, mobile-ready formats that drive results",
        features: ["Mobile-ready", "Modern Design", "Improved Engagement"],
        modal: {
          title: "Course Redesign & Modernization",
          description: "Transform your existing training content into modern, engaging, and effective learning experiences that meet today's learner expectations.",
          overview: "I take your outdated PowerPoint presentations, PDFs, or legacy e-learning courses and completely redesign them using modern instructional design principles and cutting-edge technology.",
          process: {
            title: "Redesign Process",
            steps: [
              "Content Audit: Analyzing existing materials for strengths and gaps",
              "Learning Objectives Review: Aligning content with measurable outcomes",
              "Modern Design Application: Implementing contemporary UX/UI principles", 
              "Interactive Elements: Adding engaging activities and assessments",
              "Mobile Optimization: Ensuring perfect performance across all devices",
              "Performance Testing: Validating improved engagement and learning outcomes"
            ]
          },
          improvements: {
            title: "Typical Improvements",
            items: [
              "40-60% increase in course completion rates",
              "Enhanced visual design with professional graphics",
              "Interactive elements replacing static text",
              "Mobile-responsive layouts for any device",
              "Improved navigation and user experience",
              "SCORM compliance for modern LMS integration"
            ]
          },
          beforeAfter: {
            title: "Transformation Examples",
            items: [
              "Static PowerPoint → Interactive Storyline course",
              "Text-heavy PDFs → Visual learning modules",
              "Linear presentations → Branching scenarios",
              "Desktop-only content → Mobile-responsive design",
              "Monolingual materials → Bilingual resources",
              "Basic quizzes → Gamified assessments"
            ]
          },
          timeline: "Typical timeline: 2-4 weeks depending on content volume",
          cta: "Ready to modernize your training content?"
        }
      },
      learnMore: "Learn more",
      projectsCompleted: "Projects Completed",
      happyClients: "Happy Clients",
      languagesSupported: "Languages Supported"
    },
    portfolio: {
      badge: "My Work",
      title: "Explore My Portfolio",
      subtitle: "Real projects made with Articulate 360, showcasing interactive learning experiences",
      allProjects: "All Projects",
      corporate: "Corporate",
      healthcare: "Healthcare",
      education: "Education",
      preview: "Preview",
      viewFull: "View My Full Portfolio on Upwork",
      corporateSafety: {
        title: "Corporate Safety Training",
        description: "Interactive SCORM course for workplace safety protocols with real-world scenarios",
        client: "Fortune 500 Company"
      },
      healthcareCompliance: {
        title: "Healthcare Compliance Module",
        description: "Mobile-responsive training for medical professionals with certification tracking",
        client: "Regional Hospital"
      },
      salesTraining: {
        title: "Sales Training Program",
        description: "Scenario-based learning with branching narratives and performance analytics",
        client: "Tech Startup"
      },
      universityOnboarding: {
        title: "University Onboarding",
        description: "Comprehensive orientation program for new students with gamification elements",
        client: "State University"
      },
      patientCare: {
        title: "Patient Care Excellence",
        description: "Empathy-driven training for healthcare workers with emotional intelligence focus",
        client: "Healthcare Network"
      },
      leadership: {
        title: "Leadership Development",
        description: "Executive training program with 360-degree feedback and coaching elements",
        client: "Executive Institute"
      }
    },
    testimonials: {
      badge: "Client Success Stories",
      title: "What Clients Are Saying",
      subtitle: "Feedback from verified Upwork projects and long-term partnerships",
      clientSatisfaction: "Client Satisfaction",
      averageRating: "Average Rating",
      onTimeDelivery: "On-time Delivery",
      projectsCompleted: "Projects Completed",
      basedOnUpwork: "Based on Upwork reviews",
      acrossProjects: "Across all projects",
      neverMissed: "Never missed a deadline",
      andCounting: "And counting",
      seeMoreReviews: "See More Reviews on Upwork",
      checkProfile: "Check out my complete profile with 50+ verified client reviews",
      visitProfile: "Visit My Upwork Profile",
      projectType: "Project Type:",
      completedIn: "Completed in:",
      testimonial1: {
        text: "Alvin exceeded our expectations with his professionalism and speed. The interactive training modules he created significantly improved our employee engagement rates by 40%. His attention to detail and understanding of our corporate culture was impressive.",
        name: "Sarah Johnson",
        title: "Learning & Development Manager",
        company: "AT&T",
        projectType: "Corporate Training",
        completionTime: "3 weeks"
      },
      testimonial2: {
        text: "Creative, proactive, and incredibly reliable! Alvin transformed our outdated content into engaging interactive modules that our employees actually enjoy. The bilingual capabilities were exactly what we needed for our diverse workforce.",
        name: "Carlos Rodriguez",
        title: "Training Director",
        company: "VRIO",
        projectType: "Content Redesign",
        completionTime: "2 weeks"
      },
      testimonial3: {
        text: "Highly skilled with Storyline and voice integration. Alvin created a comprehensive compliance training program that not only met regulatory requirements but also engaged our medical staff. The scenario-based approach was brilliant.",
        name: "Dr. Maria Garcia",
        title: "Head of Medical Education",
        company: "Regional Healthcare Network",
        projectType: "Healthcare Compliance",
        completionTime: "4 weeks"
      }
    },
    cta: {
      badge: "Ready to Start Your Project?",
      title: "Ready to Elevate Your Training?",
      subtitle: "Let's create engaging e-learning experiences that drive real results for your organization. From concept to completion, I'll be your trusted partner.",
      hireUpwork: "Hire Me on Upwork",
      bookCall: "Book a Discovery Call",
      footer: "Free consultation • Fast response • Bilingual support"
    },
    contact: {
      badge: "Get in Touch",
      title: "Let's Connect",
      subtitle: "Ready to create engaging e-learning experiences? Let's discuss your project!",
      howToReach: "How to Reach Me",
      hireUpwork: {
        title: "Hire on Upwork",
        description: "Browse my portfolio and hire me directly",
        action: "Visit Profile"
      },
      bookCall: {
        title: "Book a Call",
        description: "Schedule a free 30-minute consultation",
        action: "Book Now"
      },
      quickMessage: {
        title: "Quick Message",
        description: "Send me a message for quick questions",
        action: "Send Message"
      },
      quickInfo: "Quick Info",
      respondsWithin: "Usually responds within 2-4 hours",
      globalProjects: "Available for global projects",
      bilingual: "Bilingual: English & Spanish",
      sendMessage: "Send Me a Message",
      form: {
        fullName: "Full Name",
        email: "Email Address",
        company: "Company/Organization",
        projectType: "Project Type",
        projectDetails: "Project Details",
        projectDetailsPlaceholder: "Tell me about your e-learning project, timeline, and any specific requirements...",
        selectProjectType: "Select project type",
        customElearning: "Custom E-learning Course",
        courseRedesign: "Course Redesign/Modernization",
        trainingVideo: "Training Video Production",
        learningMaterials: "Learning Materials Development",
        consultation: "Consultation & Strategy",
        other: "Other",
        responseTime: "I'll respond within 24 hours with a detailed proposal",
        sending: "Sending...",
        send: "Send Message"
      },
      success: {
        title: "Message Sent Successfully!",
        subtitle: "Thank you for reaching out! I'll get back to you within 24 hours.",
        sendAnother: "Send Another Message",
        bookCallInstead: "Book a Call Instead"
      }
    },
    footer: {
      description: "Bilingual e-learning developer specialized in creating engaging, interactive training solutions for corporate, education, and healthcare sectors using cutting-edge tools and methodologies.",
      services: "Services",
      elearningDev: "E-learning Development",
      courseRedesign: "Course Redesign",
      multimediaContent: "Multimedia Content",
      trainingMaterials: "Training Materials",
      quickLinks: "Quick Links",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
      privacyPolicy: "Privacy Policy",
      madeWith: "Made with",
      forBetterLearning: "for better learning",
      availableWorldwide: "Available Worldwide",
      englishSpanish: "English & Spanish"
    },
    common: {
      scrollToTop: "Scroll to top"
    },
    about: {
      badge: "Meet Your E-learning Partner",
      title: "About Me",
      subtitle: "Passionate about creating engaging, impactful learning experiences",
      intro: "Hi! I'm Alvin — a bilingual (English/Spanish) eLearning developer and instructional designer with over 5 years of experience creating interactive training content for healthcare, education, and corporate clients across the U.S., Latin America, and Europe.",
      specialization: "I specialize in adult learning, creative instructional design, and full course development using tools like Articulate Storyline, Rise, and Figma. I'm proactive, detail-oriented, and passionate about designing engaging content that makes a real impact, especially in mission-driven environments like healthcare and nonprofit work.",
      achievements: [
        "Trusted by DIRECTV, AT&T, VRIO",
        "Bilingual | Available for global projects",
        "Responsive within 2–4 hours"
      ],
      skills: {
        title: "Technical Expertise",
        articulate: "Articulate Storyline 360",
        rise: "Articulate Rise 360",
        instructional: "Instructional Design",
        ai: "AI Voice Integration",
        scorm: "SCORM Compliance",
        bilingual: "Bilingual Content",
        expert: "Expert",
        advanced: "Advanced",
        native: "Native"
      },
      industries: {
        title: "Industries I Serve",
        healthcare: "Healthcare",
        healthcareDesc: "Medical training & compliance",
        corporate: "Corporate",
        corporateDesc: "Employee development",
        education: "Education",
        educationDesc: "Academic & institutional"
      },
      stats: {
        yearsExp: "Years Exp.",
        projects: "Projects",
        satisfaction: "Satisfaction",
        response: "Response"
      },
      cta: {
        viewDemos: "View My Demos",
        hireUpwork: "Hire Me on Upwork"
      }
    },
    whatsapp: {
      tooltip: "Chat with me on WhatsApp",
      message: "Hi Alvin! I'm interested in your e-learning development services. I'd like to discuss a potential project."
    }
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      portfolio: "Portafolio",
      testimonials: "Testimonios",
      about: "Acerca de",
      contact: "Contacto",
      bookCall: "Reservar Llamada",
      upwork: "Upwork",
      hireUpwork: "Contratar en Upwork"
    },
    hero: {
      badge: "Profesional E-learning de confianza",
      title: "Hola, soy Alvin — Desarrollador E-learning y Diseñador Instruccional",
      subtitle: "Creo soluciones de entrenamiento interactivo usando Articulate Storyline, Rise 360 y herramientas de IA.",
      achievement1: "Confiado por DIRECTV, AT&T, VRIO",
      achievement2: "Especializado en entrenamiento corporativo, educativo y de salud",
      achievement3: "Bilingüe: Inglés y Español",
      viewDemos: "Ver Mis Demos",
      hireUpwork: "Contratarme en Upwork",
      available: "Disponible para proyectos"
    },
    clients: {
      badge: "Socios de confianza",
      title: "Confiado por marcas globales",
      subtitle: "Entregando soluciones excepcionales de e-learning para líderes de la industria",
      learnersTrained: "Estudiantes Entrenados",
      projectsDelivered: "Proyectos Entregados",
      clientSatisfaction: "Satisfacción del Cliente",
      upworkRating: "Calificación Upwork"
    },
    services: {
      badge: "Mi experiencia",
      title: "Cómo puedo ayudarte",
      subtitle: "Diseño instruccional y soluciones de entrenamiento interactivo",
      service1: {
        title: "Desarrollo E-learning personalizado",
        description: "Cursos interactivos con Articulate Storyline y cumplimiento SCORM",
        features: ["Compatible SCORM", "Elementos Interactivos", "Soporte Multi-dispositivo"],
        modal: {
          title: "Desarrollo E-learning Personalizado",
          description: "Transforma tus materiales de entrenamiento en experiencias de aprendizaje atractivas e interactivas que generen resultados reales y mejoren la retención del conocimiento.",
          overview: "Creo cursos e-learning completamente personalizados desde cero usando herramientas líderes en la industria como Articulate Storyline 360. Cada curso está diseñado con tus objetivos de aprendizaje específicos, identidad de marca y audiencia objetivo en mente.",
          process: {
            title: "Mi Proceso de Desarrollo",
            steps: [
              "Descubrimiento y Análisis: Entendiendo tus objetivos, audiencia y contenido",
              "Diseño Instruccional: Creando rutas de aprendizaje y escenarios interactivos",
              "Desarrollo Visual: Gráficos personalizados, animaciones y marca",
              "Integración SCORM: Asegurando compatibilidad con tu LMS",
              "Pruebas y Refinamiento: Aseguramiento de calidad y pruebas de usuario",
              "Entrega y Soporte: Despliegue completo del curso y soporte continuo"
            ]
          },
          benefits: {
            title: "Beneficios Clave",
            items: [
              "Mejora de retención del conocimiento a través de elementos interactivos",
              "Costos de entrenamiento reducidos comparado con métodos tradicionales",
              "Solución escalable que crece con tu organización",
              "Análisis detallados y seguimiento de progreso",
              "Diseño responsivo móvil para aprender en movimiento",
              "Capacidades multilingües (inglés/español)"
            ]
          },
          deliverables: {
            title: "Lo Que Recibirás",
            items: [
              "Paquete completo de curso compatible con SCORM",
              "Archivos fuente para futuras actualizaciones",
              "Guía de implementación y documentación",
              "Materiales de entrenamiento para usuarios",
              "Soporte de 30 días post-entrega"
            ]
          },
          timeline: "Cronograma típico: 2-6 semanas dependiendo de la complejidad",
          cta: "¿Listo para crear tu curso personalizado?"
        }
      },
      service2: {
        title: "Contenido multimedia y video",
        description: "Narración IA, explicaciones animadas y demos basados en escenarios",
        features: ["Narración IA", "Animaciones", "Basado en Escenarios"],
        modal: {
          title: "Contenido Multimedia y Producción de Video",
          description: "Da vida a tu contenido de entrenamiento con elementos multimedia profesionales que capturan la atención y mejoran los resultados de aprendizaje.",
          overview: "Me especializo en crear contenido multimedia de alta calidad incluyendo narraciones impulsadas por IA, videos explicativos animados y módulos de aprendizaje interactivos basados en escenarios que hacen que los temas complejos sean fáciles de entender.",
          capabilities: {
            title: "Capacidades Multimedia",
            items: [
              "Generación de Narración IA: Narración de sonido natural en inglés y español",
              "Animaciones 2D: Gráficos personalizados y motion graphics",
              "Grabaciones de Pantalla: Tutoriales de software y demos de productos",
              "Escenarios Interactivos: Líneas narrativas ramificadas y árboles de decisión",
              "Edición de Video: Postproducción profesional y efectos",
              "Mejora de Audio: Música de fondo y efectos de sonido"
            ]
          },
          useCases: {
            title: "Perfecto Para",
            items: [
              "Demostraciones de productos y entrenamiento de software",
              "Entrenamiento de cumplimiento con escenarios del mundo real",
              "Programas de incorporación para nuevos empleados",
              "Entrenamiento de seguridad con demostraciones visuales",
              "Entrenamiento de ventas con escenarios de interacción con clientes",
              "Procedimientos médicos y protocolos de salud"
            ]
          },
          technology: {
            title: "Herramientas y Tecnología",
            items: [
              "ElevenLabs AI para narraciones profesionales",
              "Adobe Creative Suite para producción de video",
              "Articulate Storyline para elementos interactivos",
              "Vyond para personajes y escenas animadas",
              "Camtasia para grabaciones de pantalla y tutoriales"
            ]
          },
          timeline: "Cronograma típico: 1-4 semanas dependiendo del alcance",
          cta: "¡Creemos contenido multimedia atractivo!"
        }
      },
      service3: {
        title: "Materiales de entrenamiento",
        description: "Guías PDF profesionales, ayudas de trabajo y cuadernos de ejercicios",
        features: ["Guías PDF", "Ayudas de Trabajo", "Cuadernos de Ejercicios"],
        modal: {
          title: "Desarrollo de Materiales de Entrenamiento",
          description: "Recursos de aprendizaje integrales que apoyan y refuerzan tus programas de entrenamiento con diseño profesional y contenido instruccional claro.",
          overview: "Creo una suite completa de materiales de entrenamiento que complementan tus cursos e-learning o funcionan como recursos independientes. Cada material está diseñado con principios de aprendizaje para adultos y estándares de presentación profesional.",
          materials: {
            title: "Tipos de Materiales",
            items: [
              "Guías para Instructores: Materiales de facilitación integral con cronometraje y actividades",
              "Cuadernos de Participantes: Ejercicios interactivos y espacios para tomar notas",
              "Guías de Referencia Rápida: Información esencial para soporte en el trabajo",
              "Ayudas de Trabajo: Procedimientos paso a paso y listas de verificación",
              "Herramientas de Evaluación: Cuestionarios, evaluaciones y verificaciones de competencia",
              "Infografías: Resúmenes visuales de conceptos y procesos clave"
            ]
          },
          features: {
            title: "Características de Diseño",
            items: [
              "Marca profesional e identidad visual consistente",
              "Diseño accesible siguiendo las pautas WCAG 2.2",
              "Formatos listos para imprimir y digitales disponibles",
              "Elementos PDF interactivos (formularios, marcadores, enlaces)",
              "Versiones multilingües (inglés/español)",
              "Diseños amigables para móviles para visualización en tableta"
            ]
          },
          applications: {
            title: "Aplicaciones Comunes",
            items: [
              "Paquetes de incorporación de nuevos empleados",
              "Documentación de entrenamiento de cumplimiento",
              "Referencias de conocimiento de productos",
              "Manuales de procedimientos de seguridad",
              "Scripts y pautas de servicio al cliente",
              "Guías de solución de problemas técnicos"
            ]
          },
          timeline: "Cronograma típico: 1-3 semanas por conjunto de materiales",
          cta: "¿Necesitas materiales de entrenamiento profesionales?"
        }
      },
      service4: {
        title: "Rediseño de cursos",
        description: "Modernizar contenido obsoleto en formatos atractivos y móviles",
        features: ["Listo para móvil", "Diseño Moderno", "Compromiso Mejorado"],
        modal: {
          title: "Rediseño y Modernización de Cursos",
          description: "Transforma tu contenido de entrenamiento existente en experiencias de aprendizaje modernas, atractivas y efectivas que cumplan con las expectativas de los estudiantes de hoy.",
          overview: "Tomo tus presentaciones de PowerPoint obsoletas, PDFs o cursos e-learning heredados y los rediseño completamente usando principios de diseño instruccional modernos y tecnología de vanguardia.",
          process: {
            title: "Proceso de Rediseño",
            steps: [
              "Auditoría de Contenido: Analizando materiales existentes para fortalezas y brechas",
              "Revisión de Objetivos de Aprendizaje: Alineando contenido con resultados medibles",
              "Aplicación de Diseño Moderno: Implementando principios contemporáneos de UX/UI",
              "Elementos Interactivos: Agregando actividades y evaluaciones atractivas",
              "Optimización Móvil: Asegurando rendimiento perfecto en todos los dispositivos",
              "Pruebas de Rendimiento: Validando mejora en compromiso y resultados de aprendizaje"
            ]
          },
          improvements: {
            title: "Mejoras Típicas",
            items: [
              "Aumento del 40-60% en tasas de finalización de cursos",
              "Diseño visual mejorado con gráficos profesionales",
              "Elementos interactivos reemplazando texto estático",
              "Diseños responsivos móviles para cualquier dispositivo",
              "Navegación y experiencia de usuario mejoradas",
              "Cumplimiento SCORM para integración LMS moderna"
            ]
          },
          beforeAfter: {
            title: "Ejemplos de Transformación",
            items: [
              "PowerPoint estático → Curso interactivo de Storyline",
              "PDFs cargados de texto → Módulos de aprendizaje visual",
              "Presentaciones lineales → Escenarios ramificados",
              "Contenido solo para escritorio → Diseño responsivo móvil",
              "Materiales monolingües → Recursos bilingües",
              "Cuestionarios básicos → Evaluaciones gamificadas"
            ]
          },
          timeline: "Cronograma típico: 2-4 semanas dependiendo del volumen de contenido",
          cta: "¿Listo para modernizar tu contenido de entrenamiento?"
        }
      },
      learnMore: "Aprender más",
      projectsCompleted: "Proyectos Completados",
      happyClients: "Clientes Felices",
      languagesSupported: "Idiomas Soportados"
    },
    portfolio: {
      badge: "Mi trabajo",
      title: "Explora mi portafolio",
      subtitle: "Proyectos reales hechos con Articulate 360",
      allProjects: "Todos los Proyectos",
      corporate: "Corporativo",
      healthcare: "Salud",
      education: "Educación",
      preview: "Vista previa",
      viewFull: "Ver Mi Portafolio Completo en Upwork",
      corporateSafety: {
        title: "Entrenamiento Seguridad Corporativa",
        description: "Curso SCORM interactivo para protocolos de seguridad laboral",
        client: "Empresa Fortune 500"
      },
      healthcareCompliance: {
        title: "Módulo Cumplimiento Salud",
        description: "Entrenamiento responsivo para profesionales médicos",
        client: "Hospital Regional"
      },
      salesTraining: {
        title: "Programa Entrenamiento Ventas",
        description: "Aprendizaje basado en escenarios con narrativas ramificadas",
        client: "Startup Tech"
      },
      universityOnboarding: {
        title: "Incorporación Universitaria",
        description: "Programa orientación integral para nuevos estudiantes",
        client: "Universidad Estatal"
      },
      patientCare: {
        title: "Excelencia Cuidado Paciente",
        description: "Entrenamiento orientado por empatía para trabajadores salud",
        client: "Red de Salud"
      },
      leadership: {
        title: "Desarrollo Liderazgo",
        description: "Programa entrenamiento ejecutivo con retroalimentación 360 grados",
        client: "Instituto Ejecutivo"
      }
    },
    testimonials: {
      badge: "Historias de éxito del cliente",
      title: "Lo que dicen los clientes",
      subtitle: "Retroalimentación de proyectos verificados de Upwork",
      clientSatisfaction: "Satisfacción del Cliente",
      averageRating: "Calificación Promedio",
      onTimeDelivery: "Entrega a Tiempo",
      projectsCompleted: "Proyectos Completados",
      basedOnUpwork: "Basado en reseñas de Upwork",
      acrossProjects: "A través de todos los proyectos",
      neverMissed: "Nunca perdí una fecha límite",
      andCounting: "Y contando",
      seeMoreReviews: "Ver Más Reseñas en Upwork",
      checkProfile: "Consulta mi perfil completo con más de 50 reseñas verificadas de clientes",
      visitProfile: "Visitar Mi Perfil de Upwork",
      projectType: "Tipo de Proyecto:",
      completedIn: "Completado en:",
      testimonial1: {
        text: "Alvin superó nuestras expectativas con su profesionalismo y velocidad. Los módulos de entrenamiento interactivos que creó mejoraron significativamente nuestras tasas de participación de empleados en un 40%.",
        name: "Sarah Johnson",
        title: "Gerente de Aprendizaje y Desarrollo",
        company: "AT&T",
        projectType: "Entrenamiento Corporativo",
        completionTime: "3 semanas"
      },
      testimonial2: {
        text: "¡Creativo, proactivo e increíblemente confiable! Alvin transformó nuestro contenido obsoleto en módulos interactivos atractivos.",
        name: "Carlos Rodriguez",
        title: "Director de Entrenamiento",
        company: "VRIO",
        projectType: "Rediseño de Contenido",
        completionTime: "2 semanas"
      },
      testimonial3: {
        text: "Altamente capacitado con Storyline e integración de voz. Alvin creó un programa integral de entrenamiento de cumplimiento.",
        name: "Dr. Maria Garcia",
        title: "Jefe de Educación Médica",
        company: "Red Regional de Salud",
        projectType: "Cumplimiento de Salud",
        completionTime: "4 semanas"
      }
    },
    cta: {
      badge: "¿Listo para comenzar tu proyecto?",
      title: "¿Listo para elevar tu entrenamiento?",
      subtitle: "Creemos experiencias de e-learning atractivas que generen resultados reales.",
      hireUpwork: "Contratarme en Upwork",
      bookCall: "Reservar Llamada de Descubrimiento",
      footer: "Consulta gratuita • Respuesta rápida • Soporte multilingüe"
    },
    contact: {
      badge: "Ponte en contacto",
      title: "Conectémonos",
      subtitle: "¿Listo para crear experiencias de e-learning atractivas? ¡Hablemos sobre tu proyecto!",
      howToReach: "Cómo contactarme",
      hireUpwork: {
        title: "Contratar en Upwork",
        description: "Navega por mi portafolio y contrátame directamente",
        action: "Visitar Perfil"
      },
      bookCall: {
        title: "Reservar Llamada",
        description: "Programa una consulta gratuita de 30 minutos",
        action: "Reservar Ahora"
      },
      quickMessage: {
        title: "Mensaje Rápido",
        description: "Envíame un mensaje para preguntas rápidas",
        action: "Enviar Mensaje"
      },
      quickInfo: "Información Rápida",
      respondsWithin: "Generalmente responde dentro de 2-4 horas",
      globalProjects: "Disponible para proyectos globales",
      bilingual: "Bilingüe: Inglés y Español",
      sendMessage: "Envíame un Mensaje",
      form: {
        fullName: "Nombre Completo",
        email: "Dirección de Correo",
        company: "Empresa/Organización",
        projectType: "Tipo de Proyecto",
        projectDetails: "Detalles del Proyecto",
        projectDetailsPlaceholder: "Cuéntame sobre tu proyecto de e-learning, cronograma y requisitos específicos...",
        selectProjectType: "Selecciona el tipo de proyecto",
        customElearning: "Curso E-learning Personalizado",
        courseRedesign: "Rediseño/Modernización de Curso",
        trainingVideo: "Producción de Video de Entrenamiento",
        learningMaterials: "Desarrollo de Materiales de Aprendizaje",
        consultation: "Consultoría y Estrategia",
        other: "Otro",
        responseTime: "Responderé en 24 horas con una propuesta detallada",
        sending: "Enviando...",
        send: "Enviar Mensaje"
      },
      success: {
        title: "¡Mensaje Enviado Exitosamente!",
        subtitle: "¡Gracias por contactarme! Te responderé en 24 horas.",
        sendAnother: "Enviar Otro Mensaje",
        bookCallInstead: "Reservar Llamada En Su Lugar"
      }
    },
    footer: {
      description: "Desarrollador e-learning multilingüe especializado en crear soluciones de entrenamiento atractivas e interactivas.",
      services: "Servicios",
      elearningDev: "Desarrollo E-learning",
      courseRedesign: "Rediseño de Cursos",
      multimediaContent: "Contenido Multimedia",
      trainingMaterials: "Materiales de Entrenamiento",
      quickLinks: "Enlaces Rápidos",
      portfolio: "Portafolio",
      testimonials: "Testimonios",
      contact: "Contacto",
      privacyPolicy: "Política de Privacidad",
      madeWith: "Hecho con",
      forBetterLearning: "para mejor aprendizaje",
      availableWorldwide: "Disponible Mundialmente",
      englishSpanish: "Inglés y Español"
    },
    common: {
      scrollToTop: "Volver arriba"
    },
    about: {
      badge: "Conoce a Tu Socio E-learning",
      title: "Acerca de Mí",
      subtitle: "Apasionado por crear experiencias de aprendizaje atractivas e impactantes",
      intro: "¡Hola! Soy Alvin — un desarrollador de eLearning y diseñador instruccional bilingüe (inglés/español) con más de 5 años de experiencia creando contenido de entrenamiento interactivo para clientes de salud, educación y corporativos en EE.UU., América Latina y Europa.",
      specialization: "Me especializo en aprendizaje para adultos, diseño instruccional creativo y desarrollo completo de cursos usando herramientas como Articulate Storyline, Rise y Figma. Soy proactivo, detallista y apasionado por diseñar contenido atractivo que genere un impacto real, especialmente en entornos con propósito como salud y trabajo sin fines de lucro.",
      achievements: [
        "Con la confianza de DIRECTV, AT&T, VRIO",
        "Bilingüe | Disponible para proyectos globales",
        "Respuesta dentro de 2–4 horas"
      ],
      skills: {
        title: "Experiencia Técnica",
        articulate: "Articulate Storyline 360",
        rise: "Articulate Rise 360",
        instructional: "Diseño Instruccional",
        ai: "Integración Voz IA",
        scorm: "Cumplimiento SCORM",
        bilingual: "Contenido Bilingüe",
        expert: "Experto",
        advanced: "Avanzado",
        native: "Nativo"
      },
      industries: {
        title: "Industrias que Atiendo",
        healthcare: "Salud",
        healthcareDesc: "Entrenamiento médico y cumplimiento",
        corporate: "Corporativo",
        corporateDesc: "Desarrollo de empleados",
        education: "Educación",
        educationDesc: "Académico e institucional"
      },
      stats: {
        yearsExp: "Años Exp.",
        projects: "Proyectos",
        satisfaction: "Satisfacción",
        response: "Respuesta"
      },
      cta: {
        viewDemos: "Ver Mis Demos",
        hireUpwork: "Contratarme en Upwork"
      }
    },
    whatsapp: {
      tooltip: "Chatea conmigo en WhatsApp",
      message: "¡Hola Alvin! Estoy interesado en tus servicios de desarrollo de e-learning. Me gustaría discutir un proyecto potencial."
    }
  }
};