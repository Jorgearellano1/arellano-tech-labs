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
                },
                moreProjectsText: 'These are just some of our projects. We have many more success stories we\'d love to share with you.',
                moreProjectsCta: 'Contact us to learn more'
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
                    shortDescription: 'Augmented reality gallery for Totemiq, a Cuzco-based company. Interactive AR experiences that bring art to life.',
                    problem: 'Totemiq needed a modern way to showcase art pieces with immersive digital experiences.',
                    solution: 'We developed an AR gallery app that overlays digital content on physical art pieces, creating interactive tours.',
                    results: '+200% engagement, immersive visitor experience, innovative cultural showcase.'
                },
                p2: {
                    shortDescription: 'Augmented reality tourism experience. Interactive AR routes through Inca heritage sites.',
                    problem: 'Tourists needed an engaging way to explore and learn about Inca heritage sites.',
                    solution: 'We created an AR app that overlays historical information, 3D reconstructions, and interactive guides on real locations.',
                    results: 'Immersive tourist experience, educational AR content, cultural heritage preservation.'
                },
                p3: {
                    name: 'Construction Company Website',
                    shortDescription: 'Modern corporate website for a construction company with professional design, project catalog, and contact forms.',
                    problem: 'Lack of a professional digital presence, leading to lost business opportunities.',
                    solution: 'Developed with React, featuring mobile-first responsive design, SEO optimization, deployed on AWS with CloudFront.',
                    results: '+40% in online quote requests, professional brand perception.'
                },
                p4: {
                    name: 'Interactive Web Collage',
                    shortDescription: 'Interactive digital workshop where users move, rotate and assemble pieces to create art in the browser.',
                    problem: 'Material and space limitations of physical workshops.',
                    solution: 'Developed with Canvas API, advanced drag-and-drop system, basic physics, and high-res image export.',
                    results: '500+ creations generated in the first month.'
                },
                p5: {
                    name: 'Clinical Database System',
                    shortDescription: 'Comprehensive management system for clinical records with search, updates, and secure access control.',
                    problem: 'Physical file management causing delays, document loss, and data protection risks.',
                    solution: 'Normalized relational database with advanced search, role-based access, and automatic backups.',
                    results: '3,000+ digitalized records, 70% reduction in search times.'
                },
                p6: {
                    name: 'Corporate Landing Page',
                    shortDescription: 'High-impact responsive landing page with hero, services, and testimonials sections, optimized for conversion.',
                    problem: 'Need for a professional landing page for marketing campaigns to convert traffic into leads.',
                    solution: 'UI/UX design focused on conversion, scroll animations with Intersection Observer, Lighthouse optimization.',
                    results: '12% conversion rate, sub-2 second load times.'
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
                },
                moreProjectsText: 'Estos son solo algunos de nuestros proyectos. Tenemos muchos más casos de éxito que nos encantaría compartir contigo.',
                moreProjectsCta: 'Contáctanos para conocer más'
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
                    shortDescription: 'Galería de realidad aumentada para Totemiq, empresa cusqueña. Experiencias AR interactivas que dan vida al arte.',
                    problem: 'Totemiq necesitaba una forma moderna de exhibir piezas de arte con experiencias digitales inmersivas.',
                    solution: 'Desarrollamos una app de galería AR que superpone contenido digital sobre piezas de arte físicas, creando recorridos interactivos.',
                    results: '+200% engagement, experiencia inmersiva para visitantes, vitrina cultural innovadora.'
                },
                p2: {
                    shortDescription: 'Experiencia turística en realidad aumentada. Rutas AR interactivas por sitios patrimoniales incas.',
                    problem: 'Los turistas necesitaban una forma atractiva de explorar y aprender sobre sitios patrimoniales incas.',
                    solution: 'Creamos una app AR que superpone información histórica, reconstrucciones 3D y guías interactivas sobre ubicaciones reales.',
                    results: 'Experiencia turística inmersiva, contenido educativo AR, preservación del patrimonio cultural.'
                },
                p3: {
                    name: 'Web Empresa de Construcción',
                    shortDescription: 'Sitio web corporativo moderno para empresa de construcción con diseño profesional, catálogo de proyectos y formularios de contacto.',
                    problem: 'Falta de presencia digital profesional, causando pérdida de oportunidades de negocio.',
                    solution: 'Desarrollado con React, diseño responsive mobile-first, optimización SEO, desplegado en AWS con CloudFront.',
                    results: '+40% en solicitudes de cotización online, percepción de marca profesional.'
                },
                p4: {
                    name: 'Web Collage Interactivo',
                    shortDescription: 'Taller digital interactivo donde los usuarios mueven, rotan y ensamblan piezas para crear arte en el navegador.',
                    problem: 'Limitaciones de materiales y espacio de los talleres físicos.',
                    solution: 'Desarrollado con Canvas API, sistema avanzado de drag-and-drop, físicas básicas y exportación de imágenes en alta resolución.',
                    results: '500+ creaciones generadas en el primer mes.'
                },
                p5: {
                    name: 'Sistema de Base de Datos Clínica',
                    shortDescription: 'Sistema integral de gestión de registros clínicos con búsqueda, actualización y control de acceso seguro.',
                    problem: 'Gestión física de archivos causando retrasos, pérdida de documentos y riesgos de protección de datos.',
                    solution: 'Base de datos relacional normalizada con búsqueda avanzada, acceso basado en roles y respaldos automáticos.',
                    results: '3,000+ registros digitalizados, 70% de reducción en tiempos de búsqueda.'
                },
                p6: {
                    name: 'Landing Page Corporativa',
                    shortDescription: 'Landing page responsive de alto impacto con secciones de hero, servicios y testimonios, optimizada para conversión.',
                    problem: 'Necesidad de una landing page profesional para campañas de marketing que convirtiera tráfico en leads.',
                    solution: 'Diseño UI/UX enfocado en conversión, animaciones scroll con Intersection Observer, optimización Lighthouse.',
                    results: '12% tasa de conversión, tiempos de carga menores a 2 segundos.'
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
