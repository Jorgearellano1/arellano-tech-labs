import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProjectBySlug, projects } from '../data/projects';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
    const [activeImage, setActiveImage] = useState(0);

    if (!project) {
        return <Navigate to="/proyectos" replace />;
    }

    const index = projects.findIndex(p => p.slug === project.slug);
    const next = projects[(index + 1) % projects.length];

    return (
        <div className="project-detail-page" style={{ '--project-accent': project.color }}>
            <section className="project-detail-hero">
                <div className="container">
                    <Link to="/proyectos" className="back-link">
                        {t('projects.backToProjects')}
                    </Link>
                    <p className="project-detail-kicker">{project.categoryLabel} · {project.year}</p>
                    <h1 className="project-detail-title">{t(project.name)}</h1>
                    <p className="project-detail-lead">{t(project.shortDescription)}</p>
                    <div className="project-detail-tags">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="primary" size="md">{tag}</Badge>
                        ))}
                    </div>
                </div>
            </section>

            <section className="project-detail-content">
                <div className="container">
                    <div className="project-detail-grid">
                        <div className="project-detail-main">
                            <figure className={`project-detail-figure is-${project.orientation}`}>
                                <img
                                    key={activeImage}
                                    src={project.images[activeImage]}
                                    alt={`${t(project.name)} — ${activeImage + 1}/${project.images.length}`}
                                    className="project-detail-image"
                                    decoding="async"
                                />
                            </figure>
                            {project.images.length > 1 && (
                                <div className="project-gallery" role="tablist" aria-label={t('projects.gallery')}>
                                    {project.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            role="tab"
                                            aria-selected={idx === activeImage}
                                            className={`project-gallery-thumb ${idx === activeImage ? 'active' : ''}`}
                                            onClick={() => setActiveImage(idx)}
                                        >
                                            <img src={img} alt="" loading="lazy" decoding="async" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="project-section">
                                <h2>{t('projects.challenge')}</h2>
                                <p>{t(project.problem)}</p>
                            </div>

                            <div className="project-section">
                                <h2>{t('projects.solution')}</h2>
                                <p>{t(project.solution)}</p>
                            </div>

                            <div className="project-section">
                                <h2>{t('projects.results')}</h2>
                                <p>{t(project.results)}</p>
                            </div>
                        </div>

                        <aside className="project-detail-sidebar">

                            <div className="sidebar-section">
                                <h3>{t('projects.techStack')}</h3>
                                <div className="stack-tags">
                                    {project.techStack.map((tech) => (
                                        <Badge key={tech} variant="default">{tech}</Badge>
                                    ))}
                                </div>
                            </div>

                            {project.link && (
                                <div className="sidebar-section">
                                    <Button variant="outline" size="md" href={project.link} fullWidth>
                                        {t('projects.openLive')} ↗
                                    </Button>
                                </div>
                            )}

                            <div className="sidebar-cta">
                                <h3>{t('projects.interested')}</h3>
                                <p>{t('projects.scheduleCall')}</p>
                                <Button variant="primary" size="lg" to="/contacto" fullWidth>
                                    {t('projects.contactNow')}
                                </Button>
                            </div>
                        </aside>
                    </div>

                    <div className="project-detail-next">
                        <span>{t('projects.nextProject')}</span>
                        <Link to={`/proyectos/${next.slug}`}>{t(next.name)} →</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
