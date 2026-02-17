import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();

    const projects = [
        {
            id: 'luxury-ecommerce',
            name: 'Luxury E-Commerce',
            category: 'Web',
            description: t('projectsData.p1.shortDescription'),
            color: '#E8B547',
            metrics: ['+65%', 'Conversion']
        },
        {
            id: 'fitlife-app',
            name: 'FitLife App',
            category: 'Mobile',
            description: t('projectsData.p2.shortDescription'),
            color: '#F5C3D8',
            metrics: ['100K+', 'Downloads']
        },
        {
            id: 'museum-ar',
            name: 'Museum AR Experience',
            category: 'AR',
            description: t('projectsData.p3.shortDescription'),
            color: '#C4D7FF',
            metrics: ['+200%', 'Engagement']
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

                <div className="projects-cta">
                    <Link to="/proyectos" className="btn btn-outline">
                        {t('projects.viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    const [cardRef, cardVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <Link
            to={`/proyectos/${project.id}`}
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
        </Link>
    );
};

export default FeaturedProjects;
