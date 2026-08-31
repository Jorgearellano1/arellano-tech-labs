import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import SectionMotion from '../common/SectionMotion';
import { getFeaturedProjects } from '../../data/projects';
import './FeaturedProjects.css';

/** Posición de cada tarjeta según su distancia al centro (carrusel 3D). */
function pose(offset, narrow) {
    const a = Math.abs(offset);
    const s = Math.sign(offset);
    if (a === 0) return { x: '0%', rotateY: 0, scale: 1, opacity: 1, zIndex: 5 };
    if (a === 1) return { x: `${s * (narrow ? 62 : 58)}%`, rotateY: -s * 38, scale: 0.78, opacity: 0.75, zIndex: 4 };
    if (a === 2) return { x: `${s * 94}%`, rotateY: -s * 48, scale: 0.62, opacity: narrow ? 0 : 0.38, zIndex: 3 };
    return { x: `${s * 120}%`, rotateY: -s * 55, scale: 0.5, opacity: 0, zIndex: 1 };
}

const FeaturedProjects = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const projects = getFeaturedProjects();
    const [active, setActive] = useState(0);
    const [narrow, setNarrow] = useState(false);
    const n = projects.length;

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 760px)');
        const on = () => setNarrow(mq.matches);
        on();
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);

    const go = useCallback((i) => setActive(((i % n) + n) % n), [n]);
    const onKey = (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
    };

    const project = projects[active];

    return (
        <section className="section section-surface featured-projects" id="proyectos">
            <SectionMotion className="section-motion-inner">
                <div className="container container--wide">
                    <div className="section-header">
                        <h2 className="section-title">
                            {t('projects.featuredTitle')} <span className="gradient-text">{t('projects.featuredTitleAccent')}</span>
                        </h2>
                        <p className="section-subtitle">{t('projects.featuredSubtitle')}</p>
                    </div>

                    <div className="coverflow" onKeyDown={onKey}>
                        <button type="button" className="coverflow-arrow coverflow-arrow--left" onClick={() => go(active - 1)} aria-label={t('projects.prevProject')}>‹</button>
                        <div className="coverflow-stage" role="group" aria-roledescription="carousel" aria-label={t('projects.featuredTitle')}>
                            {projects.map((p, i) => {
                                let offset = i - active;
                                if (offset > n / 2) offset -= n;
                                if (offset < -n / 2) offset += n;
                                const isActive = offset === 0;
                                const target = pose(offset, narrow);
                                return (
                                    <Motion.button
                                        key={p.id}
                                        type="button"
                                        className={`coverflow-card is-${p.orientation} ${isActive ? 'active' : ''}`}
                                        style={{ '--project-accent': p.color, zIndex: target.zIndex, pointerEvents: target.opacity === 0 ? 'none' : 'auto' }}
                                        initial={false}
                                        animate={reduce ? { ...target, rotateY: 0 } : target}
                                        transition={{ duration: reduce ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => (isActive ? null : go(i))}
                                        aria-label={isActive ? t(p.name) : `${t('projects.goTo')} ${t(p.name)}`}
                                        aria-current={isActive ? 'true' : undefined}
                                        tabIndex={isActive ? 0 : -1}
                                    >
                                        <img src={p.thumbnail} alt="" loading="lazy" decoding="async" draggable="false" />
                                        <span className="coverflow-card-label">
                                            <em>{p.categoryLabel}</em>
                                            <strong>{t(p.name)}</strong>
                                        </span>
                                    </Motion.button>
                                );
                            })}
                        </div>
                        <button type="button" className="coverflow-arrow coverflow-arrow--right" onClick={() => go(active + 1)} aria-label={t('projects.nextProject')}>›</button>
                    </div>

                    <div className="coverflow-dots" role="tablist">
                        {projects.map((p, i) => (
                            <button key={p.id} type="button" role="tab" aria-selected={i === active} className={`carousel-dot ${i === active ? 'active' : ''}`} onClick={() => go(i)} aria-label={t(p.name)} />
                        ))}
                    </div>

                    <div className="coverflow-detail">
                        <AnimatePresence mode="wait" initial={false}>
                            <Motion.div
                                key={project.id}
                                className="coverflow-detail-inner"
                                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                                transition={{ duration: 0.28 }}
                                style={{ '--project-accent': project.color }}
                            >
                                <div className="coverflow-detail-main">
                                    <h3 className="project-card-name">{t(project.name)}</h3>
                                    <p className="project-card-description">{t(project.shortDescription)}</p>
                                </div>
                                <div className="coverflow-detail-side">
                                    <div className="project-card-actions">
                                        <Link to={`/proyectos/${project.slug}`} className="project-card-detail-link">
                                            {t('projects.viewProject')}
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </Motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="projects-more-cta">
                        <Link to="/proyectos" className="btn btn-outline">{t('projects.viewAll')}</Link>
                    </div>
                </div>
            </SectionMotion>
        </section>
    );
};

export default FeaturedProjects;
