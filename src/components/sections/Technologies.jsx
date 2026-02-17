import { useTranslation } from 'react-i18next';
import Badge from '../common/Badge';
import './Technologies.css';

const Technologies = () => {
    const { t } = useTranslation();

    const techCategories = [
        {
            category: t('technologies.frontend'),
            technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
            color: '#3b82f6'
        },
        {
            category: t('technologies.mobile'),
            technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
            color: '#5ac8fa'
        },
        {
            category: t('technologies.backend'),
            technologies: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'],
            color: '#bf5af2'
        },
        {
            category: t('technologies.cloud'),
            technologies: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'],
            color: '#5865f2'
        },
        {
            category: t('technologies.ar'),
            technologies: ['Unity', 'ARKit', 'ARCore', 'WebXR', t('technologies.modeling')],
            color: '#ff375f'
        },
        {
            category: t('technologies.ai'),
            technologies: ['TensorFlow', 'OpenAI', 'PyTorch', 'ML Kit'],
            color: '#23a559'
        }
    ];

    return (
        <section className="section technologies">
            <div className="container">
                <h2 className="section-title">
                    {t('technologies.title')} <span className="gradient-text">{t('technologies.titleAccent')}</span>
                </h2>
                <p className="section-subtitle">{t('technologies.subtitle')}</p>

                <div className="tech-grid">
                    {techCategories.map((cat, index) => (
                        <div
                            key={index}
                            className="tech-category discord-fade-bounce apple-smooth"
                            style={{ '--stagger-delay': `${index * 0.1}s`, '--category-color': cat.color }}
                        >
                            <div className="tech-category-header">
                                <h3 className="tech-category-title">{cat.category}</h3>
                            </div>
                            <div className="tech-tags">
                                {cat.technologies.map((tech, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="primary"
                                        size="md"
                                        className="tech-badge discord-hover-lift interactive"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                            <div className="tech-glow" style={{ background: cat.color }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Technologies;
