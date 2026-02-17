import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './CTASection.css';

const CTASection = () => {
    const { t } = useTranslation();
    const [sectionRef, sectionVisible] = useScrollReveal();

    return (
        <section
            ref={sectionRef}
            className={`cta-section scroll-reveal ${sectionVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-title">{t('cta.title')}</h2>
                    <p className="cta-subtitle">{t('cta.subtitle')}</p>
                    <Link to="/contacto" className="btn btn-primary btn-lg">
                        {t('cta.button')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
