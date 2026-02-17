import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Services.css';

const Services = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();

    const services = [
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: t('services.web.title'),
            description: t('services.web.description'),
            color: '#E8B547'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: t('services.mobile.title'),
            description: t('services.mobile.description'),
            color: '#F5C3D8'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: t('services.ar.title'),
            description: t('services.ar.description'),
            color: '#C4D7FF'
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: t('services.fullstack.title'),
            description: t('services.fullstack.description'),
            color: '#4A7C59'
        }
    ];

    return (
        <section className="section services" id="servicios">
            <div className="container">
                <div
                    ref={titleRef}
                    className={`section-header scroll-reveal ${titleVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-title">
                        {t('services.sectionTitle')} <span className="gradient-text">{t('services.sectionTitleAccent')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('services.sectionSubtitle')}
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, index }) => {
    const [cardRef, cardVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={cardRef}
            className={`service-card scroll-reveal ${cardVisible ? 'visible' : ''}`}
            style={{
                transitionDelay: `${index * 100}ms`,
                '--accent-color': service.color
            }}
        >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <div className="service-accent"></div>
        </div>
    );
};

export default Services;
