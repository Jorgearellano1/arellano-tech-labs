import { useTranslation } from 'react-i18next';
import SectionMotion from '../common/SectionMotion';
import StaggerItem from '../common/StaggerItem';
import { openLab } from '../lab/openLab';
import './Services.css';

const ICONS = {
    web: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13h3M8 16h6" />
        </svg>
    ),
    mobile: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
        </svg>
    ),
    ar: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    ),
    fullstack: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="3" width="8" height="6" rx="1.5" /><rect x="14" y="3" width="8" height="6" rx="1.5" /><rect x="8" y="15" width="8" height="6" rx="1.5" /><path d="M6 9v3h12V9M12 12v3" />
        </svg>
    ),
    perf: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 16a8 8 0 1 1 16 0" /><path d="M12 16l4-5" /><circle cx="12" cy="16" r="1.5" fill="currentColor" />
        </svg>
    )
};

const SERVICES = [
    { id: 'web', scene: 'web', color: '#E8B547' },
    { id: 'mobile', scene: 'mobile', color: '#F5C3D8' },
    { id: 'ar', scene: 'ar', color: '#C4D7FF' },
    { id: 'fullstack', scene: 'systems', color: '#4A7C59' },
    { id: 'perf', scene: 'perf', color: '#7C9AE4' }
];

const Services = () => {
    const { t } = useTranslation();

    return (
        <section className="section section-surface-alt services" id="servicios">
            <SectionMotion className="section-motion-inner">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            {t('services.sectionTitle')} <span className="gradient-text">{t('services.sectionTitleAccent')}</span>
                        </h2>
                        <p className="section-subtitle">{t('services.sectionSubtitle')}</p>
                    </div>

                    <div className="services-grid">
                        {SERVICES.map((service, index) => (
                            <StaggerItem
                                key={service.id}
                                className="service-card"
                                index={index}
                                style={{ '--accent-color': service.color }}
                            >
                                <div className="service-icon">{ICONS[service.id]}</div>
                                <h3 className="service-title">{t(`services.${service.id}.title`)}</h3>
                                <p className="service-description">{t(`services.${service.id}.description`)}</p>
                                <button type="button" className="service-try" onClick={() => openLab(service.scene)}>
                                    {t('services.tryIt')}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                                </button>
                                <div className="service-accent"></div>
                            </StaggerItem>
                        ))}
                    </div>
                </div>
            </SectionMotion>
        </section>
    );
};

export default Services;
