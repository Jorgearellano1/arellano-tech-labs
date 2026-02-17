import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getCategories, projects } from '../data/projects';
import Badge from '../components/common/Badge';
import './Projects.css';

const Projects = () => {
    const { t } = useTranslation();
    const categories = getCategories();
    const [selectedCategory, setSelectedCategory] = useState('projects.all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(projects);

    useEffect(() => {
        const filtered = projects.filter(project => {
            const matchesCategory = selectedCategory === 'projects.all' || project.category === selectedCategory;
            const translatedTitle = project.title.toLowerCase();
            const translatedDesc = t(project.shortDescription).toLowerCase();
            const translatedTags = project.tags.join(' ').toLowerCase();
            const query = searchQuery.toLowerCase();

            const matchesSearch = translatedTitle.includes(query) ||
                translatedDesc.includes(query) ||
                translatedTags.includes(query);

            return matchesCategory && matchesSearch;
        });
        setFilteredProjects(filtered);
    }, [selectedCategory, searchQuery, t]);

    return (
        <div className="projects-page-wrapper">
            {/* Aurora Hero Section */}
            <div className="aurora-hero">
                <div className="aurora-background">
                    <div className="aurora-blob blob-1"></div>
                    <div className="aurora-blob blob-2"></div>
                    <div className="aurora-blob blob-3"></div>
                </div>

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hero-header"
                    >
                        <h1 className="hero-title-minimal">
                            {t('projects.pageTitle')} <span className="text-gradient">{t('projects.pageTitleAccent')}</span>
                        </h1>
                        <p className="hero-desc-minimal">
                            {t('projects.subtitle')}
                        </p>
                    </motion.div>

                    {/* Consolidated Glass Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-filter-bar"
                    >
                        <div className="search-wrapper">
                            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21L16.65 16.65" strokeLinecap="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder={t('projects.search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="transparent-input"
                            />
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="categories-wrapper">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`minimal-tab ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {t(category)}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Clean Grid Section */}
            <div className="container py-24">
                <motion.div layout className="minimal-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="minimal-card-wrapper"
                                >
                                    <Link to={`/proyectos/${project.slug}`} className="minimal-card">
                                        <div className="card-image-box placeholder-gradient">
                                            <div className="placeholder-content">
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="placeholder-icon">
                                                    <path d="M4 16l6-6 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="placeholder-text">View Project</span>
                                            </div>
                                            <div className="card-overlay-hover">
                                                <span className="view-text">{t('projects.viewProject')}</span>
                                            </div>
                                        </div>
                                        <div className="card-info">
                                            <div className="card-meta">
                                                <span className="card-category text-gradient">{t(project.category)}</span>
                                                <span className="card-year">2024</span>
                                            </div>
                                            <h3 className="card-title">{project.title}</h3>
                                            <p className="card-exerpt">{t(project.shortDescription)}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-muted">
                                <p>{t('projects.noResults')}</p>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;
