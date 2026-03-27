import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionMotion from '../common/SectionMotion';
import './CTASection.css';

const CTASection = () => {
    const { t } = useTranslation();

    return (
        <section className="cta-section" aria-labelledby="cta-heading">
            <SectionMotion className="section-motion-inner">
                <div className="container">
                    <div className="cta-panel">
                        <div className="cta-content">
                            <p className="cta-eyebrow" aria-hidden="true" />
                            <h2 id="cta-heading" className="cta-title">
                                {t('cta.title')}
                            </h2>
                            <p className="cta-subtitle">{t('cta.subtitle')}</p>
                            <Link to="/contacto" className="btn btn-primary btn-lg cta-btn">
                                {t('cta.button')}
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionMotion>
        </section>
    );
};

export default CTASection;
