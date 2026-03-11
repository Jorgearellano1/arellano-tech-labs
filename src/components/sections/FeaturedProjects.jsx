import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedProjects.css';

// Project images
import webConst1 from '../../assets/projects/web-construccion/hero.png';
import webConst2 from '../../assets/projects/web-construccion/servicios.png';
import webConst3 from '../../assets/projects/web-construccion/equipo.png';
import webConst4 from '../../assets/projects/web-construccion/metodo.png';

import totemiq1 from '../../assets/projects/totemiq/galeria.png';
import totemiq2 from '../../assets/projects/totemiq/ar-figure1.png';
import totemiq3 from '../../assets/projects/totemiq/ar-figure2.png';

import totems1 from '../../assets/projects/totems-del-inca/home.png';
import totems2 from '../../assets/projects/totems-del-inca/ar-totem.jpg';
import totems3 from '../../assets/projects/totems-del-inca/ar-totem2.png';
import totems4 from '../../assets/projects/totems-del-inca/mapa.png';
import totems5 from '../../assets/projects/totems-del-inca/mapa3d.jpg';

import collage1 from '../../assets/projects/collage-interactivo/canvas.png';
import collage2 from '../../assets/projects/collage-interactivo/piezas.png';
import collage3 from '../../assets/projects/collage-interactivo/colores.png';
import collage4 from '../../assets/projects/collage-interactivo/plantillas.png';
import collage5 from '../../assets/projects/collage-interactivo/compartir.png';

import clinica1 from '../../assets/projects/bd-clinica/dashboard.png';
import clinica2 from '../../assets/projects/bd-clinica/historias.png';
import clinica3 from '../../assets/projects/bd-clinica/buscador.png';
import clinica4 from '../../assets/projects/bd-clinica/estadisticas.png';
import clinica5 from '../../assets/projects/bd-clinica/especialidades.png';

import landing1 from '../../assets/projects/web-landing/hero.png';
import landing2 from '../../assets/projects/web-landing/servicios.png';

const FeaturedProjects = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();
    const [currentProject, setCurrentProject] = useState(0);

    const projects = [
        {
            id: 'totemiq',
            name: 'Totemiq',
            category: 'AR / Web',
            description: t('projectsData.p1.shortDescription'),
            tech: ['React', 'Three.js', 'WebXR', 'GLTF'],
            color: '#8B6914',
            images: [totemiq1, totemiq2, totemiq3]
        },
        {
            id: 'totems-del-inca',
            name: 'Totems del Inca',
            category: 'AR / Mobile',
            description: t('projectsData.p2.shortDescription'),
            tech: ['Swift', 'Kotlin', 'ARKit', 'ARCore', 'Three.js'],
            color: '#C4A265',
            images: [totems1, totems2, totems3, totems4, totems5]
        },
        {
            id: 'web-construccion',
            name: t('projectsData.p3.name'),
            category: 'Web',
            description: t('projectsData.p3.shortDescription'),
            tech: ['React', 'CSS3', 'AWS', 'SEO'],
            color: '#3B82F6',
            images: [webConst1, webConst2, webConst3, webConst4]
        },
        {
            id: 'collage-interactivo',
            name: t('projectsData.p4.name'),
            category: 'Web',
            description: t('projectsData.p4.shortDescription'),
            tech: ['JavaScript', 'Canvas API', 'SVG', 'CSS3'],
            color: '#F59E0B',
            images: [collage1, collage2, collage3, collage4, collage5]
        },
        {
            id: 'bd-clinica',
            name: t('projectsData.p5.name'),
            category: 'Full Stack',
            description: t('projectsData.p5.shortDescription'),
            tech: ['MySQL', 'Node.js', 'Express', 'React'],
            color: '#10B981',
            images: [clinica1, clinica2, clinica3, clinica4, clinica5]
        },
        {
            id: 'web-landing',
            name: t('projectsData.p6.name'),
            category: 'Web',
            description: t('projectsData.p6.shortDescription'),
            tech: ['HTML5', 'CSS3', 'JavaScript', 'SEO'],
            color: '#8B5CF6',
            images: [landing1, landing2]
        }
    ];

    const goToPrev = () => {
        setCurrentProject(prev => prev === 0 ? projects.length - 1 : prev - 1);
    };

    const goToNext = () => {
        setCurrentProject(prev => prev === projects.length - 1 ? 0 : prev + 1);
    };

    return (
        <section className="section featured-projects" id="proyectos">
            <div className="container">
                <div
                    ref={titleRef}
                    className={`section-header scroll-reveal ${titleVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-title">
                        {t('projects.featuredTitle')} <span className="gradient-text">{t('projects.featuredTitleAccent')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('projects.featuredSubtitle')}
                    </p>
                </div>

                {/* Project Carousel */}
                <div className="project-carousel">
                    <button className="carousel-arrow carousel-arrow-left" onClick={goToPrev} aria-label="Previous project">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <ProjectCard key={projects[currentProject].id} project={projects[currentProject]} />

                    <button className="carousel-arrow carousel-arrow-right" onClick={goToNext} aria-label="Next project">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* Dots */}
                <div className="carousel-dots">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentProject ? 'active' : ''}`}
                            onClick={() => setCurrentProject(index)}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="projects-more-cta">
                    <p className="projects-more-text">{t('projects.moreProjectsText')}</p>
                    <Link to="/contacto" className="btn btn-outline">
                        {t('projects.moreProjectsCta')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImage(prev => prev === 0 ? project.images.length - 1 : prev - 1);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImage(prev => prev === project.images.length - 1 ? 0 : prev + 1);
    };

    return (
        <div className="project-card-featured">
            <div className="project-card-image-section">
                <div className="project-image-carousel">
                    <img
                        src={project.images[currentImage]}
                        alt={`${project.name} - ${currentImage + 1}`}
                        className="project-carousel-img"
                        loading="lazy"
                    />
                    {project.images.length > 1 && (
                        <>
                            <button className="img-arrow img-arrow-left" onClick={prevImage} aria-label="Previous image">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button className="img-arrow img-arrow-right" onClick={nextImage} aria-label="Next image">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                            <div className="img-dots">
                                {project.images.map((_, i) => (
                                    <span key={i} className={`img-dot ${i === currentImage ? 'active' : ''}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="project-card-info">
                <span className="project-card-category">{project.category}</span>
                <h3 className="project-card-name">{project.name}</h3>
                <p className="project-card-description">{project.description}</p>
                <div className="project-card-tech">
                    {project.tech.map(tech => (
                        <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjects;
