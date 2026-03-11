import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // Navigation
            nav: {
                home: 'Home',
                projects: 'Projects',
                about: 'About Us',
                contact: 'Contact',
                modes: {
                    light: 'light',
                    dark: 'dark'
                },
                aria: {
                    switchTheme: 'Switch to {{mode}} mode',
                    toggleMenu: 'Toggle mobile menu'
                }
            },
            // Hero Section
            hero: {
                greeting: 'Hi, we are',
                title: 'AJM TECH',
                prefix: 'Transforming ideas into',
                typewriter: ['exceptional software', 'digital experiences', 'scalable solutions'],
                subtitle: 'Technology partner designing and developing premium software.<br />Real results, scalable code, unforgettable experience.',
                cta: 'Schedule a Call',
                viewProjects: 'View Projects',
            },
            // Services
            services: {
                sectionTitle: 'What',
                sectionTitleAccent: 'we do',
                sectionSubtitle: 'Complete digital solutions that transform your business and exceed expectations',
                web: {
                    title: 'Web Development',
                    description: 'Modern, responsive websites and web applications built with cutting-edge technologies',
                    features: ['E-commerce', 'Dashboards', 'Web Apps', 'Custom CMS']
                },
                mobile: {
                    title: 'Mobile Apps',
                    description: 'Native iOS and Android apps with exceptional user experience',
                    features: ['iOS/Android', 'React Native', 'Flutter', 'Offline-first']
                },
                ar: {
                    title: 'Augmented Reality',
                    description: 'Immersive AR experiences that blend digital and physical worlds',
                    features: ['ARKit/ARCore', 'Unity', 'WebAR', '3D Modeling']
                },
                fullstack: {
                    title: 'Full Stack Development',
                    description: 'Complete frontend + backend solutions. Node.js, Python, Java with relational and NoSQL databases for maximum performance.',
                    features: ['RESTful APIs', 'GraphQL', 'Microservices', 'Cloud (AWS/GCP)']
                },
                enterprise: {
                    title: 'Enterprise Systems',
                    description: 'Scalable business solutions and process automation',
                    features: ['CRM/ERP', 'Integrations', 'Security', 'Compliance']
                },
                design: {
                    title: 'UI/UX Design',
                    description: 'User-centered design with research, prototyping and testing. Interfaces that convert visitors into customers.',
                    features: ['User Research', 'Figma/Adobe XD', 'Design Systems', 'A/B Testing']
                }
            },
            // Projects Page
            projects: {
                pageTitle: 'Our',
                pageTitleAccent: 'Projects',
                subtitle: 'Real success stories with measurable results',
                viewDetails: 'View details',
                viewProject: 'View project',
                viewAll: 'View all projects',
                search: 'Search by name, tech or description...',
                found: 'project(s) found',
                noResults: 'No projects found matching your search.',
                clearFilters: 'Clear filters',
                all: 'All',
                featuredTitle: 'Featured',
                featuredTitleAccent: 'Projects',
                featuredSubtitle: 'Success stories that demonstrate our expertise',
                backToProjects: '← Back to projects',
                challenge: 'The Challenge',
                solution: 'The Solution',
                results: 'Results',
                techStack: 'Tech Stack',
                interested: 'Want something similar?',
                scheduleCall: 'Schedule a call and let\'s talk about your project',
                contactNow: 'Contact Now',
                categories: {
                    web: 'Web',
                    mobile: 'Mobile',
                    ar: 'AR',
                    backend: 'Backend',
                    uiux: 'UI/UX'
                }
            },
            // Metrics (Common)
            metrics: {
                conversion: 'Conversion',
                loadTime: 'Load Time',
                userRating: 'User Rating',
                downloads: 'Downloads',
                retention: 'Retention',
                appStore: 'App Store',
                engagement: 'Engagement',
                usersMo: 'Users/mo',
                avgSession: 'Avg. Session',
                dataPoints: 'Data Points/day',
                queryTime: 'Query Time',
                uptime: 'Uptime',
                users: 'Users',
                contacts: 'Contacts',
                sla: 'SLA',
                leads: 'Leads',
                pageLoad: 'Page Load',
                timeOnSite: 'Time on Site',
                latency: 'Latency',
                activeUsers: 'Active Users',
                videoQuality: 'Video Quality',
                transaction: 'Transaction',
                rating: 'Rating',
                contentsMonth: 'Contents/month',
                paidUsers: 'Paid Users',
                mrr: 'MRR'
            },
            // Projects Data
            projectsData: {
                p1: {
                    shortDescription: 'High-conversion e-commerce platform for a premium fashion brand.',
                    problem: 'The brand needed a premium shopping experience that reflected its identity and increased conversions.',
                    solution: 'We developed a custom platform with optimized checkout, smart search, and personalized recommendations.',
                    results: '+65% in conversion, -40% in load time, and 4.8 average star rating.'
                },
                p2: {
                    shortDescription: 'Fitness mobile app with real-time tracking and personalized plans.',
                    problem: 'Users found generic fitness apps unmotivating.',
                    solution: 'We created a gamified experience with automatic tracking, integrated community, and AI-adaptive plans.',
                    results: '100K+ downloads in 3 months, 92% monthly retention, 4.9 stars in App Store.'
                },
                p3: {
                    shortDescription: 'Augmented reality experience for a historical museum with interactive tours.',
                    problem: 'The museum wanted to modernize the experience and attract younger audiences.',
                    solution: 'We developed an AR app that brings exhibits to life with 3D models, narrated audio, and educational games.',
                    results: '+200% engagement, 50K monthly users, 15min average session.'
                },
                p4: {
                    shortDescription: 'Real-time analytics dashboard for enterprise SaaS platform.',
                    problem: 'The company needed to visualize millions of data points in real-time without lag.',
                    solution: 'Serverless architecture with data streaming, smart caching, and optimized visualizations.',
                    results: 'Processes 1M+ data points/day, queries <100ms, 99.9% uptime guaranteed.'
                },
                p5: {
                    shortDescription: 'Scalable enterprise CRM system with workflow automation.',
                    problem: 'Company with slow legacy CRM unable to scale with growth.',
                    solution: 'Migration to microservices architecture with process automation and predictive AI.',
                    results: 'Handles 10K concurrent users, 500K contacts, 99.95% SLA.'
                },
                p6: {
                    shortDescription: 'Complete corporate website redesign focused on conversion.',
                    problem: 'Outdated site with low engagement and poor brand perception.',
                    solution: 'Premium design focused on UX, persuasive copy, extreme performance, and optimized SEO.',
                    results: '+120% in leads, 3.5s load time, +85% time on site.'
                },
                p7: {
                    shortDescription: 'Real-time messaging platform with video calls and file sharing.',
                    problem: 'Client needed an internal communication platform with maximum privacy.',
                    solution: 'Custom WebRTC infrastructure with end-to-end encryption and low latency.',
                    results: '<50ms latency, 100K+ active users, stable HD video.'
                },
                p8: {
                    shortDescription: 'Mobile banking app with biometrics, instant transfers, and financial AI.',
                    problem: 'Traditional bank needed to compete with modern fintechs.',
                    solution: 'Flutter app with exceptional UX, banking-grade security, and AI savings features.',
                    results: '500K downloads, transactions <2s, 4.7★ rating.'
                },
                p9: {
                    shortDescription: 'SaaS platform for marketing content generation with AI.',
                    problem: 'Marketers spend hours creating repetitive content.',
                    solution: 'SaaS that generates copy, images, and full strategies using GPT-4 and DALL-E.',
                    results: '50K contents/month, 8K paid users, $500K MRR.'
                }
            },
            // Why Us
            whyUs: {
                title: 'Why',
                titleAccent: 'choose us',
                subtitle: 'We are not just another agency. We are your long-term technology partner.',
                weeks: ' wks',
                reasons: {
                    results: {
                        title: 'Measurable Results',
                        description: 'Not just pretty code. We optimize for conversion, retention and ROI. Our clients see 40%+ improvements in their key KPIs.'
                    },
                    speed: {
                        title: 'Delivery Speed',
                        description: 'Agile methodology with 2-week sprints. Functional MVP in 4-6 weeks, not months. We iterate fast based on real feedback.'
                    },
                    stack: {
                        title: 'Modern Stack',
                        description: 'We only use proven and scalable technologies. React, Next.js, TypeScript, Node.js, AWS. Your project won\'t get obsolete.'
                    },
                    support: {
                        title: 'Continuous Support',
                        description: 'We don\'t leave you alone post-launch. Maintenance, updates, new features and technical support when you need it.'
                    }
                }
            },
            // Process
            process: {
                title: 'How we',
                titleAccent: 'work',
                subtitle: 'Proven process to deliver projects on time and on budget',
                steps: {
                    discovery: {
                        title: 'Discovery',
                        description: 'We understand your business, users and goals. Initial workshop + research.'
                    },
                    strategy: {
                        title: 'Strategy',
                        description: 'We define architecture, stack and roadmap. Clickable prototype to validate.'
                    },
                    development: {
                        title: 'Development',
                        description: '2-week sprints with constant demos. Clean and tested code.'
                    },
                    launch: {
                        title: 'Launch',
                        description: 'Deploy to production with monitoring. Training for your team. Continuous support.'
                    }
                }
            },
            // FAQ
            faq: {
                title: 'Frequently Asked',
                titleAccent: 'Questions',
                subtitle: 'Everything you need to know before starting',
                items: {
                    time: {
                        question: 'How long does a typical project take?',
                        answer: 'It depends on the scope, but a functional MVP can be ready in 4-6 weeks. More complex projects (enterprise platforms, apps with multiple features) can take 3-6 months. We always work in 2-week sprints with continuous deliveries.'
                    },
                    pricing: {
                        question: 'What is your pricing model?',
                        answer: 'We offer both fixed price projects and dedicated team models (time & materials). For well-defined projects, we quote fixed. For evolving products, we recommend monthly dedicated team with flexibility to adjust priorities.'
                    },
                    support: {
                        question: 'Do you offer post-launch support?',
                        answer: 'Yes, absolutely. We offer monthly maintenance packages including: 24/7 monitoring, bug fixing, security updates, performance optimizations and new feature development as needed.'
                    },
                    startups: {
                        question: 'Do you work with startups or only established companies?',
                        answer: 'We work with both. We have experience helping startups launch their MVP and validate their idea, as well as modernizing legacy systems for established companies. We adapt our methodology and pricing to each case.'
                    },
                    quality: {
                        question: 'How do you guarantee code quality?',
                        answer: 'We follow industry best practices: mandatory code reviews, automated testing (unit + integration), CI/CD, full documentation, and we use TypeScript for type safety. All code is clean, maintainable and scalable.'
                    },
                    progress: {
                        question: 'Can I see my project progress in real-time?',
                        answer: 'Yes. We give you access to our management tools (Jira/Linear) where you can see every ticket, sprint progress, and demos every 2 weeks. Transparent communication is key for us.'
                    }
                }
            },
            // About Page
            about: {
                pageTitle: 'About',
                pageTitleAccent: 'Us',
                subtitle: 'A team of developers passionate about creating exceptional software',
                missionTitle: 'Our Mission',
                missionText: 'At AJM TECH, we don\'t just write code. We build solutions that transform businesses. Our mission is to democratize access to world-class technology, helping businesses of all sizes compete in the digital age with tools that truly work.',
                qualityTitle: 'Quality First',
                qualityText: 'Clean, tested, and documented code. We don\'t deliver disposable MVPs, we build to scale.',
                transparencyTitle: 'Total Transparency',
                transparencyText: 'See progress in real-time, participate in every sprint review, and make informed decisions.',
                resultsTitle: 'Measurable Results',
                resultsText: 'We optimize for real metrics: conversion, retention, performance. No vanity metrics.',
                partnerTitle: 'Long-term Partner',
                partnerText: 'We don\'t disappear post-launch. We\'re here to evolve your product with you.',
                approachTitle: 'Our Approach',
                approachText: 'We combine industry best practices with an agile methodology adapted to each client. From startups that need to validate their idea quickly to established companies requiring legacy system modernization, we have the experience and flexibility to deliver.',
                projectsDelivered: 'Projects Delivered',
                activeClients: 'Active Clients',
                uptimeSLA: 'Uptime SLA',
                clientRating: 'Client Rating',
            },
            // Testimonials
            testimonials: {
                title: 'What Our',
                titleAccent: 'Clients Say',
                subtitle: 'Real results that speak for themselves',
                items: {
                    t1: {
                        quote: 'AJM TECH completely transformed our digital presence. The e-commerce they developed exceeded our expectations in speed and conversion. Top-notch professionals.',
                        author: 'Maria Gonzalez',
                        role: 'CEO',
                        company: 'Luxury Fashion Co.'
                    },
                    t2: {
                        quote: 'The mobile app they created has an incredible level of polish. Users love it and our retention rate skyrocketed. Worth every penny.',
                        author: 'Carlos Mendoza',
                        role: 'Founder',
                        company: 'FitLife App'
                    },
                    t3: {
                        quote: 'We needed a trusted technical partner for our enterprise CRM. Not only did they deliver on time, but the architecture is solid and scalable. Highly recommended.',
                        author: 'Ana Rodriguez',
                        role: 'CTO',
                        company: 'Enterprise Solutions Inc.'
                    },
                    t4: {
                        quote: 'The AJM TECH team demonstrates exceptional technical expertise. The platform they built handles millions of users seamlessly. Impressive work.',
                        author: 'Roberto Silva',
                        role: 'VP Engineering',
                        company: 'TechStartup Global'
                    }
                }
            },
            // Technologies
            technologies: {
                title: 'Our Technology',
                titleAccent: 'Stack',
                subtitle: 'We work with the most modern and proven technologies on the market',
                frontend: 'Frontend',
                mobile: 'Mobile',
                backend: 'Backend',
                cloud: 'Cloud & DevOps',
                ar: 'AR/VR',
                ai: 'AI/ML',
                modeling: '3D Modeling',
            },
            // CTA Section
            cta: {
                title: 'Ready to transform your idea into reality?',
                subtitle: 'Let\'s build something exceptional together',
                button: 'Start Your Project',
            },
            // Contact Page
            contactPage: {
                title: 'Let\'s talk',
                titleAccent: 'about your project',
                subtitle: 'Schedule a free 30-minute call or send us a message',
                form: {
                    name: 'Full Name *',
                    namePlaceholder: 'Your name',
                    email: 'Email *',
                    emailPlaceholder: 'your@email.com',
                    phone: 'Phone (optional)',
                    message: 'Tell us about your project *',
                    messagePlaceholder: 'Describe your project, goals, estimated timeline, etc.',
                    submit: 'Send Message',
                    success: 'Message sent successfully! We will contact you soon.'
                },
                info: {
                    title: 'Contact Information',
                    hours: {
                        title: 'Business Hours',
                        text1: 'Monday to Friday: 9:00 AM - 6:00 PM PST',
                        text2: 'We reply to emails in less than 24 hours'
                    },
                    call: {
                        title: 'Prefer to talk directly?',
                        text: 'Schedule a 30-minute call with no commitment',
                        button: 'Schedule Call'
                    }
                }
            },
            // Footer
            footer: {
                tagline: 'Transforming ideas into high-impact digital solutions.',
                services: 'Services',
                company: {
                    title: 'Company',
                    about: 'About Us',
                    projects: 'Projects',
                    process: 'Process',
                    contact: 'Contact'
                },
                contact: 'Contact',
                copyright: '© {{year}} AJM TECH. All rights reserved.',
                legal: {
                    privacy: 'Privacy Policy',
                    terms: 'Terms of Service',
                    cookies: 'Cookies'
                },
                address: {
                    city: 'Lima',
                    country: 'Per\u00fa'
                }
            }
        },
    },
    es: {
        translation: {
            // Navegación
            nav: {
                home: 'Inicio',
                projects: 'Proyectos',
                about: 'Nosotros',
                contact: 'Contacto',
                modes: {
                    light: 'claro',
                    dark: 'oscuro'
                },
                aria: {
                    switchTheme: 'Cambiar a modo {{mode}}',
                    toggleMenu: 'Menú principal'
                }
            },
            // Hero Section
            hero: {
                greeting: 'Hola, somos',
                title: 'AJM TECH',
                prefix: 'Transformamos ideas en',
                typewriter: ['software excepcional', 'experiencias digitales', 'soluciones escalables'],
                subtitle: 'Partner tecnológico que diseña y desarrolla software premium.<br />Resultados reales, código escalable, experiencia inolvidable.',
                cta: 'Agendar llamada',
                viewProjects: 'Ver proyectos',
            },
            // Servicios
            services: {
                sectionTitle: '¿Qué',
                sectionTitleAccent: 'hacemos',
                sectionSubtitle: 'Soluciones digitales completas que transforman tu negocio y superan expectativas',
                web: {
                    title: 'Desarrollo Web',
                    description: 'Sitios web y aplicaciones web modernas y responsivas con tecnologías de vanguardia',
                    features: ['E-commerce', 'Dashboards', 'Web Apps', 'CMS Custom']
                },
                mobile: {
                    title: 'Apps Móviles',
                    description: 'Apps nativas para iOS y Android con experiencia de usuario excepcional',
                    features: ['iOS/Android', 'React Native', 'Flutter', 'Offline-first']
                },
                ar: {
                    title: 'Realidad Aumentada',
                    description: 'Experiencias AR inmersivas que fusionan los mundos digital y físico',
                    features: ['ARKit/ARCore', 'Unity', 'WebAR', 'Modelado 3D']
                },
                fullstack: {
                    title: 'Full Stack Development',
                    description: 'Soluciones completas frontend + backend. Node.js, Python, Java con bases de datos relacionales y NoSQL para máximo rendimiento.',
                    features: ['APIs RESTful', 'GraphQL', 'Microservicios', 'Cloud (AWS/GCP)']
                },
                enterprise: {
                    title: 'Sistemas Empresariales',
                    description: 'Soluciones empresariales escalables y automatización de procesos',
                    features: ['CRM/ERP', 'Integraciones', 'Seguridad', 'Compliance']
                },
                design: {
                    title: 'Diseño UI/UX',
                    description: 'Diseño centrado en el usuario con research, prototipado y testing. Interfaces que convierten visitantes en clientes.',
                    features: ['User Research', 'Figma/Adobe XD', 'Design Systems', 'A/B Testing']
                }
            },
            // Proyectos  
            projects: {
                pageTitle: 'Nuestros',
                pageTitleAccent: 'Proyectos',
                subtitle: 'Casos de éxito reales con resultados medibles',
                viewDetails: 'Ver detalles',
                viewProject: 'Ver proyecto',
                viewAll: 'Ver todos los proyectos',
                search: 'Buscar por nombre, tech o descripción...',
                found: 'proyecto(s) encontrado(s)',
                noResults: 'No se encontraron proyectos que coincidan con tu búsqueda.',
                clearFilters: 'Limpiar filtros',
                all: 'Todos',
                featuredTitle: 'Proyectos',
                featuredTitleAccent: 'destacados',
                featuredSubtitle: 'Casos de éxito que demuestran nuestra experiencia',
                backToProjects: '← Volver a proyectos',
                challenge: 'El Desafío',
                solution: 'La Solución',
                results: 'Resultados',
                techStack: 'Stack Tecnológico',
                interested: '¿Quieres algo similar?',
                scheduleCall: 'Agenda una llamada y hablemos de tu proyecto',
                contactNow: 'Contactar ahora',
                categories: {
                    web: 'Web',
                    mobile: 'Mobile',
                    ar: 'AR',
                    backend: 'Backend',
                    uiux: 'UI/UX'
                }
            },
            // Metrics (Common)
            metrics: {
                conversion: 'Conversión',
                loadTime: 'Load Time',
                userRating: 'User Rating',
                downloads: 'Downloads',
                retention: 'Retention',
                appStore: 'App Store',
                engagement: 'Engagement',
                usersMo: 'Users/mo',
                avgSession: 'Avg. Session',
                dataPoints: 'Data Points/day',
                queryTime: 'Query Time',
                uptime: 'Uptime',
                users: 'Users',
                contacts: 'Contacts',
                sla: 'SLA',
                leads: 'Leads',
                pageLoad: 'Page Load',
                timeOnSite: 'Time on Site',
                latency: 'Latency',
                activeUsers: 'Active Users',
                videoQuality: 'Video Quality',
                transaction: 'Transaction',
                rating: 'Rating',
                contentsMonth: 'Contents/month',
                paidUsers: 'Paid Users',
                mrr: 'MRR'
            },
            // Projects Data
            projectsData: {
                p1: {
                    shortDescription: 'Plataforma de e-commerce de alta conversión para marca de moda premium.',
                    problem: 'La marca necesitaba una experiencia de compra premium que reflejara su identidad y aumentara las conversiones.',
                    solution: 'Desarrollamos una plataforma custom con checkout optimizado, búsqueda inteligente y recomendaciones personalizadas.',
                    results: '+65% en conversión, -40% en tiempo de carga, y 4.8 estrellas de rating promedio.'
                },
                p2: {
                    shortDescription: 'App móvil de fitness con tracking en tiempo real y planes personalizados.',
                    problem: 'Los usuarios encontraban las apps de fitness genéricas y poco motivadoras.',
                    solution: 'Creamos una experiencia gamificada con tracking automático, comunidad integrada y planes adaptativos por IA.',
                    results: '100K+ descargas en 3 meses, 92% de retención mensual, 4.9 estrellas en App Store.'
                },
                p3: {
                    shortDescription: 'Experiencia de realidad aumentada para museo histórico con tours interactivos.',
                    problem: 'El museo quería modernizar la experiencia y atraer audiencias más jóvenes.',
                    solution: 'Desarrollamos una app AR que da vida a las exhibiciones con modelos 3D, audio narrado y juegos educativos.',
                    results: '+200% engagement, 50K usuarios mensuales, 15min de sesión promedio.'
                },
                p4: {
                    shortDescription: 'Dashboard de analytics en tiempo real para plataforma SaaS empresarial.',
                    problem: 'La empresa necesitaba visualizar millones de data points en tiempo real sin lag.',
                    solution: 'Arquitectura serverless con data streaming, cache inteligente y visualizaciones optimizadas.',
                    results: 'Procesa 1M+ datos/día, queries <100ms, 99.9% uptime garantizado.'
                },
                p5: {
                    shortDescription: 'Sistema CRM empresarial escalable con automatización de workflows.',
                    problem: 'Empresa con CRM legacy lento e incapaz de escalar con el crecimiento.',
                    solution: 'Migración a arquitectura microservicios con automatización de procesos y AI predictiva.',
                    results: 'Maneja 10K users concurrentes, 500K contactos, 99.95% SLA.'
                },
                p6: {
                    shortDescription: 'Rediseño completo de sitio corporativo con enfoque en conversión.',
                    problem: 'Sitio desactualizado con bajo engagement y mala percepción de marca.',
                    solution: 'Diseño premium centrado en UX, copy persuasivo, performance extrema y SEO optimizado.',
                    results: '+120% en leads, 3.5s load time, +85% tiempo en el sitio.'
                },
                p7: {
                    shortDescription: 'Plataforma de mensajería en tiempo real con llamadas de video y archivos.',
                    problem: 'Cliente necesitaba plataforma de comunicación interna con máxima privacidad.',
                    solution: 'Infraestructura WebRTC custom con encriptación end-to-end y baja latencia.',
                    results: '<50ms latencia, 100K+ usuarios activos, video HD estable.'
                },
                p8: {
                    shortDescription: 'App de banca móvil con biometría, transfers instantáneos y AI financiero.',
                    problem: 'Banco tradicional necesitaba competir con fintechs modernas.',
                    solution: 'App Flutter con UX excepcional, seguridad bancaria y features de IA para ahorro.',
                    results: '500K downloads, transacciones <2s, 4.7★ rating.'
                },
                p9: {
                    shortDescription: 'Plataforma SaaS para generación de contenido marketing con IA.',
                    problem: 'Marketers gastan horas creando contenido repetitivo.',
                    solution: 'SaaS que genera copy, imágenes y estrategias completas usando GPT-4 y DALL-E.',
                    results: '50K contenidos/mes, 8K usuarios pagos, $500K MRR.'
                }
            },
            // Why Us
            whyUs: {
                title: '¿Por qué',
                titleAccent: 'elegirnos',
                subtitle: 'No somos otra agencia más. Somos tu partner tecnológico a largo plazo.',
                weeks: ' sem',
                reasons: {
                    results: {
                        title: 'Resultados medibles',
                        description: 'No solo código bonito. Optimizamos para conversión, retención y ROI. Nuestros clientes ven mejoras del 40%+ en sus KPIs clave.'
                    },
                    speed: {
                        title: 'Velocidad de entrega',
                        description: 'Metodología ágil con sprints de 2 semanas. MVP funcional en 4-6 semanas, no meses. Iteramos rápido basados en feedback real.'
                    },
                    stack: {
                        title: 'Stack moderno',
                        description: 'Solo usamos tecnologías probadas y escalables. React, Next.js, TypeScript, Node.js, AWS. Tu proyecto no quedará obsoleto.'
                    },
                    support: {
                        title: 'Soporte continuo',
                        description: 'No te dejamos solo post-launch. Mantenimiento, updates, nuevas features y soporte técnico cuando lo necesites.'
                    }
                }
            },
            // Process
            process: {
                title: 'Cómo',
                titleAccent: 'trabajamos',
                subtitle: 'Proceso probado para entregar proyectos a tiempo y presupuesto',
                steps: {
                    discovery: {
                        title: 'Discovery',
                        description: 'Entendemos tu negocio, usuarios y objetivos. Workshop inicial + research.'
                    },
                    strategy: {
                        title: 'Strategy',
                        description: 'Definimos arquitectura, stack y roadmap. Prototipo clickeable para validar.'
                    },
                    development: {
                        title: 'Development',
                        description: 'Sprints de 2 semanas con demos constantes. Código limpio y testeado.'
                    },
                    launch: {
                        title: 'Launch',
                        description: 'Deploy a producción con monitoring. Training a tu equipo. Soporte continuo.'
                    }
                }
            },
            // FAQ
            faq: {
                title: 'Preguntas',
                titleAccent: 'frecuentes',
                subtitle: 'Todo lo que necesitas saber antes de empezar',
                items: {
                    time: {
                        question: '¿Cuánto tiempo tarda un proyecto típico?',
                        answer: 'Depende del alcance, pero un MVP funcional puede estar listo en 4-6 semanas. Proyectos más complejos (plataformas enterprise, apps con múltiples features) pueden tomar 3-6 meses. Siempre trabajamos en sprints de 2 semanas con entregas continuas.'
                    },
                    pricing: {
                        question: '¿Cuál es su modelo de precios?',
                        answer: 'Ofrecemos tanto proyectos a precio fijo como modelo de equipo dedicado (time & materials). Para proyectos bien definidos, cotizamos fijo. Para productos en evolución, recomendamos equipo dedicado mensual con flexibilidad para ajustar prioridades.'
                    },
                    support: {
                        question: '¿Dan soporte post-lanzamiento?',
                        answer: 'Sí, absolutamente. Ofrecemos paquetes de mantenimiento mensuales que incluyen: monitoreo 24/7, corrección de bugs, actualizaciones de seguridad, optimizaciones de performance y desarrollo de nuevas features según necesites.'
                    },
                    startups: {
                        question: '¿Trabajan con startups o solo con empresas establecidas?',
                        answer: 'Trabajamos con ambos. Tenemos experiencia ayudando a startups a lanzar su MVP y validar su idea, así como modernizando sistemas legacy de empresas establecidas. Adaptamos nuestra metodología y pricing a cada caso.'
                    },
                    quality: {
                        question: '¿Cómo garantizan la calidad del código?',
                        answer: 'Seguimos las mejores prácticas: code reviews obligatorios, testing automatizado (unit + integration), CI/CD, documentación completa, y usamos TypeScript para type safety. Todo el código es limpio, mantenible y escalable.'
                    },
                    progress: {
                        question: '¿Puedo ver el progreso de mi proyecto en tiempo real?',
                        answer: 'Sí. Te damos acceso a nuestras herramientas de gestión (Jira/Linear) donde puedes ver cada ticket, progreso del sprint, y demos cada 2 semanas. Comunicación transparente es clave para nosotros.'
                    }
                }
            },
            // Nosotros
            about: {
                pageTitle: 'Sobre',
                pageTitleAccent: 'Nosotros',
                subtitle: 'Un equipo de desarrolladores apasionados por crear software excepcional',
                missionTitle: 'Nuestra Misión',
                missionText: 'En AJM TECH, no solo escribimos código. Construimos soluciones que transforman negocios. Nuestra misión es democratizar el acceso a tecnología de clase mundial, ayudando a empresas de todos los tamaños a competir en la era digital con herramientas que realmente funcionan.',
                qualityTitle: 'Calidad ante todo',
                qualityText: 'Código limpio, testeado y documentado. No entregamos MVPs desechables, construimos para escalar.',
                transparencyTitle: 'Transparencia total',
                transparencyText: 'Ve el progreso en tiempo real, participa en cada sprint review, y toma decisiones informadas.',
                resultsTitle: 'Resultados medibles',
                resultsText: 'Optimizamos para métricas reales: conversión, retención, performance. No vanity metrics.',
                partnerTitle: 'Partner a largo plazo',
                partnerText: 'No desaparecemos post-launch. Estamos aquí para evolucionar tu producto contigo.',
                approachTitle: 'Nuestro Enfoque',
                approachText: 'Combinamos las mejores prácticas de la industria con una metodología ágil adaptada a cada cliente. Desde startups que necesitan validar su idea rápidamente hasta empresas establecidas que requieren modernizar sistemas legacy, tenemos la experiencia y flexibilidad para entregar.',
                projectsDelivered: 'Proyectos Entregados',
                activeClients: 'Clientes Activos',
                uptimeSLA: 'Uptime SLA',
                clientRating: 'Client Rating',
            },
            // Testimonios
            testimonials: {
                title: 'Lo que dicen',
                titleAccent: 'nuestros clientes',
                subtitle: 'Resultados reales que hablan por sí mismos',
                items: {
                    t1: {
                        quote: 'AJM TECH transformó completamente nuestra presencia digital. El e-commerce que desarrollaron superó nuestras expectativas en velocidad y conversión. Profesionales de primera.',
                        author: 'María González',
                        role: 'CEO',
                        company: 'Luxury Fashion Co.'
                    },
                    t2: {
                        quote: 'La app móvil que crearon tiene un nivel de pulido increíble. Los usuarios la adoran y nuestro retention rate se disparó. Valió cada centavo.',
                        author: 'Carlos Mendoza',
                        role: 'Founder',
                        company: 'FitLife App'
                    },
                    t3: {
                        quote: 'Necesitábamos un partner técnico de confianza para nuestro CRM empresarial. No solo entregaron a tiempo, sino que la arquitectura es sólida y escalable. Muy recomendados.',
                        author: 'Ana Rodríguez',
                        role: 'CTO',
                        company: 'Enterprise Solutions Inc.'
                    },
                    t4: {
                        quote: 'El equipo de AJM TECH demuestra una experiencia técnica excepcional. La plataforma que construyeron maneja millones de usuarios sin problemas. Impresionante trabajo.',
                        author: 'Roberto Silva',
                        role: 'VP de Ingeniería',
                        company: 'TechStartup Global'
                    }
                }
            },
            // Tecnologías
            technologies: {
                title: 'Nuestro',
                titleAccent: 'stack tecnológico',
                subtitle: 'Trabajamos con las tecnologías más modernas y probadas del mercado',
                frontend: 'Frontend',
                mobile: 'Mobile',
                backend: 'Backend',
                cloud: 'Cloud & DevOps',
                ar: 'AR/VR',
                ai: 'AI/ML',
                modeling: 'Modelado 3D',
            },
            // CTA Section
            cta: {
                title: '¿Listo para transformar tu idea en realidad?',
                subtitle: 'Construyamos algo excepcional juntos',
                button: 'Iniciar Tu Proyecto',
            },
            // Contact Page
            contactPage: {
                title: 'Hablemos',
                titleAccent: 'de tu proyecto',
                subtitle: 'Agenda una llamada gratuita de 30 minutos o envíanos un mensaje',
                form: {
                    name: 'Nombre completo *',
                    namePlaceholder: 'Tu nombre',
                    email: 'Email *',
                    emailPlaceholder: 'tu@email.com',
                    phone: 'Teléfono (opcional)',
                    message: 'Cuéntanos sobre tu proyecto *',
                    messagePlaceholder: 'Describe tu proyecto, objetivos, timeline estimado, etc.',
                    submit: 'Enviar mensaje',
                    success: '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
                },
                info: {
                    title: 'Información de Contacto',
                    hours: {
                        title: 'Horario',
                        text1: 'Lunes a Viernes: 9:00 AM - 6:00 PM PST',
                        text2: 'Respondemos emails en menos de 24 horas'
                    },
                    call: {
                        title: '¿Prefieres hablar directamente?',
                        text: 'Agenda una llamada de 30 minutos sin compromiso',
                        button: 'Agendar llamada'
                    }
                }
            },
            // Footer
            footer: {
                tagline: 'Transformando ideas en soluciones digitales de alto impacto.',
                services: 'Servicios',
                company: {
                    title: 'Empresa',
                    about: 'Sobre Nosotros',
                    projects: 'Proyectos',
                    process: 'Proceso',
                    contact: 'Contacto'
                },
                contact: 'Contacto',
                copyright: '© {{year}} AJM TECH. Todos los derechos reservados.',
                legal: {
                    privacy: 'Política de Privacidad',
                    terms: 'Términos de Servicio',
                    cookies: 'Cookies'
                },
                address: {
                    city: 'Lima',
                    country: 'Per\u00fa'
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
