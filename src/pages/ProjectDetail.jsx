import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProjectBySlug } from '../data/projects';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    if (!project) {
        return <Navigate to="/proyectos" replace />;
    }

    return (
        <div className="project-detail-page">
            <section className="project-detail-hero">
                <div className="container">
                    <Link to="/proyectos" className="back-link">
                        {t('projects.backToProjects')}
                    </Link>
                    <h1 className="project-detail-title">{project.title}</h1>
                    <div className="project-detail-tags">
                        <Badge variant="accent" size="lg">{t(project.category)}</Badge>
                        {project.tags.map((tag, idx) => (
                            <Badge key={idx} variant="primary" size="md">{tag}</Badge>
                        ))}
                    </div>
                </div>
            </section>

            <section className="project-detail-content">
                <div className="container">
                    <div className="project-detail-grid">
                        <div className="project-detail-main">
                            <img src={project.thumbnail} alt={project.title} className="project-detail-image" />

                            <div className="project-section">
                                <h2>{t('projects.challenge')}</h2>
                                <p>{t(project.problem)}</p>
                            </div>

                            <div className="project-section">
                                <h2>{t('projects.solution')}</h2>
                                <p>{t(project.solution)}</p>
                            </div>

                            {project.images && project.images.length > 1 && (
                                <div className="project-gallery">
                                    {project.images.map((img, idx) => (
                                        <img key={idx} src={img} alt={`${project.title} screenshot ${idx + 1}`} loading="lazy" />
                                    ))}
                                </div>
                            )}
                        </div>

                        <aside className="project-detail-sidebar">
                            <div className="sidebar-section">
                                <h3>{t('projects.results')}</h3>
                                <div className="project-metrics-list">
                                    {project.metrics.map((metric, idx) => (
                                        <div key={idx} className="metric-item">
                                            <div className="metric-value gradient-text">{metric.value}</div>
                                            <div className="metric-label">{t(metric.label)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h3>{t('projects.techStack')}</h3>
                                <div className="stack-tags">
                                    {/* Fix: use techStack instead of stack */}
                                    {project.techStack.map((tech, idx) => (
                                        <Badge key={idx} variant="default">{tech}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-cta">
                                <h3>{t('projects.interested')}</h3>
                                <p>{t('projects.scheduleCall')}</p>
                                <Button variant="primary" size="lg" to="/contacto" fullWidth>
                                    {t('projects.contactNow')}
                                </Button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
