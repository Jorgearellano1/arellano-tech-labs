import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();

    const projects = [
        {
            id: 'totemiq',
            name: 'Totemiq',
            category: 'AR',
            description: t('projectsData.p1.shortDescription'),
            color: '#8B6914',
            metrics: ['+200%', t('metrics.engagement')]
        },
        {
            id: 'totems-del-inca',
            name: 'Totems del Inca',
            category: 'AR',
            description: t('projectsData.p2.shortDescription'),
            color: '#C4A265',
            metrics: ['AR', t('metrics.engagement')]
        },
        {
            id: 'web-empresa',
            name: t('projectsData.p3.name'),
            category: 'Web',
            description: t('projectsData.p3.shortDescription'),
            color: '#3B82F6',
            metrics: ['+120%', t('metrics.leads')]
        }
    ];

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

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
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

const ProjectCard = ({ project, index }) => {
    const [cardRef, cardVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={cardRef}
            className={`project-card scroll-reveal ${cardVisible ? 'visible' : ''}`}
            style={{
                transitionDelay: `${index * 150}ms`,
                '--accent-color': project.color
            }}
        >
            <div className="project-image" style={{ background: project.color }}>
                <div className="project-category">{project.category}</div>
            </div>
            <div className="project-content">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-metric">
                    <span className="metric-value">{project.metrics[0]}</span>
                    <span className="metric-label">{project.metrics[1]}</span>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjects;
