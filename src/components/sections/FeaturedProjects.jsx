import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import SectionMotion from '../common/SectionMotion';
import { getFeaturedProjects } from '../../data/projects';
import './FeaturedProjects.css';

const ArrowIcon = ({ dir = 'right', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
);

const FeaturedProjects = () => {
    const { t } = useTranslation();
    const projects = getFeaturedProjects();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const reduce = useReducedMotion();

    const go = (delta) => {
        setDirection(delta);
        setCurrent(prev => (prev + delta + projects.length) % projects.length);
    };

    const project = projects[current];

    const variants = reduce
        ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            enter: (d) => ({ opacity: 0, x: d * 48 }),
            center: { opacity: 1, x: 0 },
            exit: (d) => ({ opacity: 0, x: d * -48 })
        };

    return (
        <section className="section section-surface featured-projects" id="proyectos">
            <SectionMotion className="section-motion-inner">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            {t('projects.featuredTitle')} <span className="gradient-text">{t('projects.featuredTitleAccent')}</span>
                        </h2>
                        <p className="section-subtitle">{t('projects.featuredSubtitle')}</p>
                    </div>

                    <div className="project-carousel">
                        <button className="carousel-arrow carousel-arrow-left" onClick={() => go(-1)} aria-label={t('projects.prevProject')}>
                            <ArrowIcon dir="left" />
                        </button>

                        <div className="project-carousel-stage">
                            <AnimatePresence mode="wait" custom={direction} initial={false}>
                                <Motion.div
                                    key={project.id}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <ProjectCard project={project} t={t} />
                                </Motion.div>
                            </AnimatePresence>
                        </div>

                        <button className="carousel-arrow carousel-arrow-right" onClick={() => go(1)} aria-label={t('projects.nextProject')}>
                            <ArrowIcon dir="right" />
                        </button>
                    </div>

                    <div className="carousel-dots" role="tablist" aria-label={t('projects.featuredTitle')}>
                        {projects.map((p, index) => (
                            <button
                                key={p.id}
                                role="tab"
                                aria-selected={index === current}
                                className={`carousel-dot ${index === current ? 'active' : ''}`}
                                onClick={() => { setDirection(index > current ? 1 : -1); setCurrent(index); }}
                                aria-label={t(p.name)}
                            />
                        ))}
                    </div>

                    <div className="projects-more-cta">
                        <p className="projects-more-text">{t('projects.moreProjectsText')}</p>
                        <Link to="/proyectos" className="btn btn-outline">
                            {t('projects.viewAll')}
                        </Link>
                    </div>
                </div>
            </SectionMotion>
        </section>
    );
};

const ProjectCard = ({ project, t }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const total = project.images.length;

    const step = (e, delta) => {
        e.stopPropagation();
        setCurrentImage(prev => (prev + delta + total) % total);
    };

    return (
        <div className={`project-card-featured is-${project.orientation}`} style={{ '--project-accent': project.color }}>
            <div className="project-card-image-section">
                <div className="project-image-carousel">
                    <img
                        src={project.images[currentImage]}
                        alt={`${t(project.name)} — ${currentImage + 1}/${total}`}
                        className="project-carousel-img"
                        loading="lazy"
                        decoding="async"
                    />
                    {total > 1 && (
                        <>
                            <button className="img-arrow img-arrow-left" onClick={(e) => step(e, -1)} aria-label={t('projects.prevImage')}>
                                <ArrowIcon dir="left" size={18} />
                            </button>
                            <button className="img-arrow img-arrow-right" onClick={(e) => step(e, 1)} aria-label={t('projects.nextImage')}>
                                <ArrowIcon dir="right" size={18} />
                            </button>
                            <div className="img-dots" aria-hidden>
                                {project.images.map((_, i) => (
                                    <span key={i} className={`img-dot ${i === currentImage ? 'active' : ''}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="project-card-info">
                <span className="project-card-category">{project.categoryLabel}</span>
                <h3 className="project-card-name">{t(project.name)}</h3>
                <p className="project-card-description">{t(project.shortDescription)}</p>
                {project.metrics.length > 0 && (
                    <ul className="project-card-metrics">
                        {project.metrics.map(m => (
                            <li key={m.label}>
                                <strong>{m.value}</strong>
                                <span>{t(m.label)}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="project-card-tech">
                    {project.tags.map(tech => (
                        <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                </div>
                <div className="project-card-actions">
                    <Link to={`/proyectos/${project.slug}`} className="project-card-detail-link">
                        {t('projects.viewProject')}
                        <ArrowIcon size={18} />
                    </Link>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-live-link">
                            {t('projects.openLive')}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjects;
