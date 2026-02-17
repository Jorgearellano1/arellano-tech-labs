import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './WhyUs.css';

const WhyUs = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();

    const reasons = [
        {
            icon: '📈',
            title: t('whyUs.reasons.results.title'),
            description: t('whyUs.reasons.results.description'),
            stat: '+40%',
            statLabel: 'KPIs'
        },
        {
            icon: '⚡',
            title: t('whyUs.reasons.speed.title'),
            description: t('whyUs.reasons.speed.description'),
            stat: '4-6',
            statLabel: t('whyUs.weeks')
        },
        {
            icon: '🛠️',
            title: t('whyUs.reasons.stack.title'),
            description: t('whyUs.reasons.stack.description'),
            stat: '100%',
            statLabel: 'Modern'
        },
        {
            icon: '🤝',
            title: t('whyUs.reasons.support.title'),
            description: t('whyUs.reasons.support.description'),
            stat: '24/7',
            statLabel: 'Support'
        }
    ];

    return (
        <section className="section why-us" id="por-que-nosotros">
            <div className="container">
                <div
                    ref={titleRef}
                    className={`section-header scroll-reveal ${titleVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-title">
                        {t('whyUs.title')} <span className="gradient-text">{t('whyUs.titleAccent')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('whyUs.subtitle')}
                    </p>
                </div>

                <div className="reasons-grid">
                    {reasons.map((reason, index) => (
                        <ReasonCard key={index} reason={reason} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ReasonCard = ({ reason, index }) => {
    const [cardRef, cardVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={cardRef}
            className={`reason-card scroll-reveal ${cardVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="reason-stat">
                <span className="stat-value">{reason.stat}</span>
                <span className="stat-label">{reason.statLabel}</span>
            </div>
            <div className="reason-content">
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
            </div>
        </div>
    );
};

export default WhyUs;
