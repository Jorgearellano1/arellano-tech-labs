import { useMemo, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getCategories, projects } from '../data/projects';
import './Projects.css';

const Projects = () => {
    const { t } = useTranslation();
    const categories = getCategories();
    const [selectedCategory, setSelectedCategory] = useState('projects.all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return projects.filter(project => {
            const matchesCategory = selectedCategory === 'projects.all' || project.category === selectedCategory;
            if (!matchesCategory) return false;
            if (!query) return true;
            const haystack = [
                t(project.name),
                t(project.shortDescription),
                project.tags.join(' '),
                project.techStack.join(' ')
            ].join(' ').toLowerCase();
            return haystack.includes(query);
        });
    }, [selectedCategory, searchQuery, t]);

    return (
        <div className="projects-page-wrapper">
            <div className="aurora-hero">
                <div className="aurora-background" aria-hidden>
                    <div className="aurora-blob blob-1"></div>
                    <div className="aurora-blob blob-2"></div>
                    <div className="aurora-blob blob-3"></div>
                </div>

                <div className="container relative z-10">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hero-header"
                    >
                        <h1 className="hero-title-minimal">
                            {t('projects.pageTitle')} <span className="text-gradient">{t('projects.pageTitleAccent')}</span>
                        </h1>
                        <p className="hero-desc-minimal">{t('projects.subtitle')}</p>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-filter-bar"
                    >
                        <div className="search-wrapper">
                            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21L16.65 16.65" strokeLinecap="round" />
                            </svg>
                            <input
                                type="search"
                                placeholder={t('projects.search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="transparent-input"
                                aria-label={t('projects.search')}
                            />
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="categories-wrapper" role="tablist">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    role="tab"
                                    aria-selected={selectedCategory === category}
                                    className={`minimal-tab ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {t(category)}
                                </button>
                            ))}
                        </div>
                    </Motion.div>
                </div>
            </div>

            <div className="container py-24">
                <p className="projects-count" aria-live="polite">
                    {filteredProjects.length} {t('projects.found')}
                </p>
                <Motion.div layout className="minimal-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <Motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.35 }}
                                    className="minimal-card-wrapper"
                                >
                                    <Link to={`/proyectos/${project.slug}`} className="minimal-card" style={{ '--project-accent': project.color }}>
                                        <div className={`card-image-box is-${project.orientation}`}>
                                            <img
                                                src={project.thumbnail}
                                                alt={t(project.name)}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="card-overlay-hover">
                                                <span className="view-text">{t('projects.viewProject')}</span>
                                            </div>
                                        </div>
                                        <div className="card-info">
                                            <div className="card-meta">
                                                <span className="card-category text-gradient">{project.categoryLabel}</span>
                                                <span className="card-year">{project.year}</span>
                                            </div>
                                            <h3 className="card-title">{t(project.name)}</h3>
                                            <p className="card-exerpt">{t(project.shortDescription)}</p>
                                        </div>
                                    </Link>
                                </Motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-muted">
                                <p>{t('projects.noResults')}</p>
                                <button className="btn btn-outline" onClick={() => { setSearchQuery(''); setSelectedCategory('projects.all'); }}>
                                    {t('projects.clearFilters')}
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </Motion.div>
            </div>
        </div>
    );
};

export default Projects;
