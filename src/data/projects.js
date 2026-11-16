/**
 * Fuente única de verdad de proyectos.
 * Cada texto largo es una clave i18n (ver src/i18n/config.js → projectsData).
 */
import totemiqGaleria from '../assets/projects/totemiq/galeria.webp';
import totemiqAr1 from '../assets/projects/totemiq/ar-figure1.webp';
import totemiqAr2 from '../assets/projects/totemiq/ar-figure2.webp';

import totemsHome from '../assets/projects/totems-del-inca/home.webp';
import totemsAr from '../assets/projects/totems-del-inca/ar-totem.webp';
import totemsAr2 from '../assets/projects/totems-del-inca/ar-totem2.webp';
import totemsMapa from '../assets/projects/totems-del-inca/mapa.webp';
import totemsMapa3d from '../assets/projects/totems-del-inca/mapa3d.webp';

import constHero from '../assets/projects/web-construccion/hero.webp';
import constServicios from '../assets/projects/web-construccion/servicios.webp';
import constEquipo from '../assets/projects/web-construccion/equipo.webp';
import constMetodo from '../assets/projects/web-construccion/metodo.webp';

import collageCanvas from '../assets/projects/collage-interactivo/canvas.webp';
import collagePiezas from '../assets/projects/collage-interactivo/piezas.webp';
import collageColores from '../assets/projects/collage-interactivo/colores.webp';
import collagePlantillas from '../assets/projects/collage-interactivo/plantillas.webp';
import collageCompartir from '../assets/projects/collage-interactivo/compartir.webp';

import clinicaDashboard from '../assets/projects/bd-clinica/dashboard.webp';
import clinicaHistorias from '../assets/projects/bd-clinica/historias.webp';
import clinicaBuscador from '../assets/projects/bd-clinica/buscador.webp';
import clinicaEstadisticas from '../assets/projects/bd-clinica/estadisticas.webp';
import clinicaEspecialidades from '../assets/projects/bd-clinica/especialidades.webp';

import landingHero from '../assets/projects/web-landing/hero.webp';
import landingServicios from '../assets/projects/web-landing/servicios.webp';

import plantaHero from '../assets/projects/planta-llipata/hero.webp';
import plantaServicios from '../assets/projects/planta-llipata/servicios.webp';
import plantaNosotros from '../assets/projects/planta-llipata/nosotros.webp';
import plantaProceso from '../assets/projects/planta-llipata/proceso.webp';

import vapLogin from '../assets/projects/vap360/login.webp';
import vapLogo from '../assets/clients/vap360.svg';

import siriusLogin from '../assets/projects/sirius/login.webp';
import siriusLogo from '../assets/clients/sirius.svg';
import bmnHome from '../assets/projects/grupo-bmn/home.webp';
import bmnSeccion from '../assets/projects/grupo-bmn/seccion.webp';
import bmnLogo from '../assets/clients/bmn.png';
import limaHome from '../assets/projects/lima-basics/home.webp';
import erpResumen from '../assets/projects/erp-base/control-resumen.webp';
import erpCaja from '../assets/projects/erp-base/caja.webp';
import erpCompras from '../assets/projects/erp-base/compras.webp';
import erpLogo from '../assets/clients/erpbase.svg';
import makkoArena from '../assets/projects/makko/makko-arena-victory.webp';
import makkoAvatar from '../assets/projects/makko/makko-avatar-companion-room-tabs.webp';
import makkoGrupo from '../assets/projects/makko/group-goal-simple-393.webp';
import makkoLogo from '../assets/clients/makko.svg';

export const projects = [
    {
        id: 'vap360',
        slug: 'vap360',
        name: 'projectsData.p8.name',
        category: 'projects.categories.fullstack',
        categoryLabel: 'Sistema · Full Stack',
        year: 2026,
        featured: true,
        color: '#0F9D58',
        shortDescription: 'projectsData.p8.shortDescription',
        problem: 'projectsData.p8.problem',
        solution: 'projectsData.p8.solution',
        results: 'projectsData.p8.results',
        tags: ['React', 'TypeScript', 'FastAPI', 'Odoo'],
        techStack: ['React', 'TypeScript', 'Tailwind', 'FastAPI', 'PostgreSQL', 'Odoo API', 'Railway'],
        logo: vapLogo,
        private: true,
        thumbnail: vapLogin,
        images: [vapLogin],
        orientation: 'landscape'
    },
    {
        id: 'sirius', slug: 'sirius', name: 'Sirius',
        category: 'projects.categories.fullstack', categoryLabel: 'Sistema · Full Stack',
        featured: true, color: '#14098F',
        shortDescription: 'rd.p.sirius',
        tags: ['Angular', 'Spring Boot', 'Java'], techStack: ['Angular', 'Spring Boot', 'Java', 'AWS Lightsail'],
        link: 'https://siriuscrs.com', logo: siriusLogo,
        thumbnail: siriusLogin, images: [siriusLogin], orientation: 'landscape'
    },
    {
        id: 'erp-base', slug: 'erp-base', name: 'ERP Base',
        category: 'projects.categories.fullstack', categoryLabel: 'Sistema · Full Stack',
        featured: true, color: '#0F3B36',
        shortDescription: 'rd.p.erpbase',
        tags: ['Angular', 'Tailwind', 'Capacitor'], techStack: ['Angular', 'Tailwind', 'Capacitor', 'Caddy'],
        logo: erpLogo, private: true,
        thumbnail: erpResumen, images: [erpResumen, erpCaja, erpCompras], orientation: 'landscape'
    },
    {
        id: 'makko', slug: 'makko', name: 'Makko',
        category: 'projects.categories.mobile', categoryLabel: 'Mobile · iOS',
        featured: true, color: '#1B2F8F',
        shortDescription: 'rd.p.makko',
        tags: ['Swift', 'SwiftUI', 'watchOS'], techStack: ['Swift', 'SwiftUI', 'SwiftData', 'Kotlin', 'Spring Boot'],
        logo: makkoLogo,
        thumbnail: makkoArena, images: [makkoArena, makkoAvatar, makkoGrupo], orientation: 'portrait'
    },
    {
        id: 'grupo-bmn', slug: 'grupo-bmn', name: 'Grupo BMN',
        category: 'projects.categories.web', categoryLabel: 'Web',
        featured: true, color: '#1565C0',
        shortDescription: 'rd.p.bmn',
        tags: ['Next.js', 'Tailwind', 'SEO'], techStack: ['Next.js', 'Tailwind', 'SEO'],
        link: 'https://grupobmn.com', logo: bmnLogo,
        thumbnail: bmnHome, images: [bmnHome, bmnSeccion], orientation: 'landscape'
    },
    {
        id: 'lima-basics', slug: 'lima-basics', name: 'Lima Basics',
        category: 'projects.categories.web', categoryLabel: 'E-commerce',
        featured: true, color: '#8E1B1B',
        shortDescription: 'rd.p.lima',
        tags: ['Shopify', 'Liquid', 'E-commerce'], techStack: ['Shopify', 'Liquid'],
        link: 'https://lblimabasics.com',
        thumbnail: limaHome, images: [limaHome], orientation: 'landscape'
    },
    {
        id: 'planta-llipata',
        slug: 'planta-llipata',
        name: 'projectsData.p7.name',
        category: 'projects.categories.web',
        categoryLabel: 'Web',
        year: 2026,
        featured: true,
        color: '#F26A1B',
        shortDescription: 'projectsData.p7.shortDescription',
        problem: 'projectsData.p7.problem',
        solution: 'projectsData.p7.solution',
        results: 'projectsData.p7.results',
        tags: ['React', 'TypeScript', 'Vite', 'SEO'],
        techStack: ['React', 'TypeScript', 'Vite', 'CSS', 'Google Maps', 'SEO'],
        link: 'https://plantallipata.com',
        thumbnail: plantaHero,
        images: [plantaHero, plantaServicios, plantaNosotros, plantaProceso],
        orientation: 'landscape'
    },
    {
        id: 'totemiq',
        slug: 'totemiq',
        name: 'projectsData.p1.name',
        category: 'projects.categories.ar',
        categoryLabel: 'AR / Web',
        year: 2025,
        featured: true,
        color: '#8B6914',
        shortDescription: 'projectsData.p1.shortDescription',
        problem: 'projectsData.p1.problem',
        solution: 'projectsData.p1.solution',
        results: 'projectsData.p1.results',
        tags: ['React', 'Three.js', 'WebXR', 'GLTF'],
        techStack: ['React', 'TypeScript', 'Three.js', 'WebXR', 'GLTF', 'Railway'],
        link: 'https://ar.totemiq.art',
        thumbnail: totemiqGaleria,
        images: [totemiqGaleria, totemiqAr1, totemiqAr2],
        orientation: 'mixed'
    },
    {
        id: 'totems-del-inca',
        slug: 'totems-del-inca',
        name: 'projectsData.p2.name',
        category: 'projects.categories.ar',
        categoryLabel: 'AR / Mobile',
        year: 2025,
        featured: true,
        color: '#C4A265',
        shortDescription: 'projectsData.p2.shortDescription',
        problem: 'projectsData.p2.problem',
        solution: 'projectsData.p2.solution',
        results: 'projectsData.p2.results',
        tags: ['Swift', 'Kotlin', 'ARKit', 'ARCore'],
        techStack: ['Swift', 'Kotlin', 'ARKit', 'ARCore', 'Three.js', 'Firebase'],
        thumbnail: totemsHome,
        images: [totemsHome, totemsAr, totemsAr2, totemsMapa, totemsMapa3d],
        orientation: 'portrait'
    },
    {
        id: 'web-construccion',
        slug: 'web-construccion',
        name: 'projectsData.p3.name',
        category: 'projects.categories.web',
        categoryLabel: 'Web',
        year: 2024,
        featured: true,
        color: '#3B82F6',
        shortDescription: 'projectsData.p3.shortDescription',
        problem: 'projectsData.p3.problem',
        solution: 'projectsData.p3.solution',
        results: 'projectsData.p3.results',
        tags: ['React', 'CSS3', 'AWS', 'SEO'],
        techStack: ['React', 'CSS3', 'AWS S3', 'CloudFront', 'SEO'],
        thumbnail: constHero,
        images: [constHero, constServicios, constEquipo, constMetodo],
        orientation: 'landscape'
    },
    {
        id: 'collage-interactivo',
        slug: 'collage-interactivo',
        name: 'projectsData.p4.name',
        category: 'projects.categories.web',
        categoryLabel: 'Web',
        year: 2024,
        featured: true,
        color: '#F59E0B',
        shortDescription: 'projectsData.p4.shortDescription',
        problem: 'projectsData.p4.problem',
        solution: 'projectsData.p4.solution',
        results: 'projectsData.p4.results',
        tags: ['JavaScript', 'Canvas API', 'SVG'],
        techStack: ['JavaScript', 'Canvas API', 'SVG', 'CSS3', 'Drag & Drop'],
        thumbnail: collageCanvas,
        images: [collageCanvas, collagePiezas, collageColores, collagePlantillas, collageCompartir],
        orientation: 'landscape'
    },
    {
        id: 'bd-clinica',
        slug: 'bd-clinica',
        name: 'projectsData.p5.name',
        category: 'projects.categories.fullstack',
        categoryLabel: 'Full Stack',
        year: 2024,
        featured: true,
        color: '#10B981',
        shortDescription: 'projectsData.p5.shortDescription',
        problem: 'projectsData.p5.problem',
        solution: 'projectsData.p5.solution',
        results: 'projectsData.p5.results',
        tags: ['MySQL', 'Node.js', 'Express', 'React'],
        techStack: ['MySQL', 'Node.js', 'Express', 'React', 'JWT', 'Backups'],
        thumbnail: clinicaDashboard,
        images: [clinicaDashboard, clinicaHistorias, clinicaBuscador, clinicaEstadisticas, clinicaEspecialidades],
        orientation: 'landscape'
    },
    {
        id: 'web-landing',
        slug: 'web-landing',
        name: 'projectsData.p6.name',
        category: 'projects.categories.web',
        categoryLabel: 'Web',
        year: 2024,
        featured: true,
        color: '#8B5CF6',
        shortDescription: 'projectsData.p6.shortDescription',
        problem: 'projectsData.p6.problem',
        solution: 'projectsData.p6.solution',
        results: 'projectsData.p6.results',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'SEO'],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Intersection Observer', 'Lighthouse'],
        thumbnail: landingHero,
        images: [landingHero, landingServicios],
        orientation: 'landscape'
    }
];

export const getCategories = () => ['projects.all', ...new Set(projects.map(p => p.category))];
export const getProjectBySlug = (slug) => projects.find(p => p.slug === slug);
export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '');
