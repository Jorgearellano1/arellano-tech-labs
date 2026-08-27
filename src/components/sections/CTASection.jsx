import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CTASection.css';

const WORDS = ['web', 'mobile', 'ar', 'fullstack', 'perf'];

/** Sello circular con texto que gira lentamente (SVG textPath, solo transform). */
const Seal = ({ text }) => (
    <Link to="/contacto" className="cta-seal" aria-label={text.replace(/ · /g, ', ')}>
        <svg viewBox="0 0 200 200" aria-hidden className="cta-seal-ring">
            <defs>
                <path id="cta-seal-path" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
            </defs>
            <text className="cta-seal-text">
                <textPath href="#cta-seal-path" startOffset="0" textLength="450" lengthAdjust="spacing">{text}</textPath>
            </text>
        </svg>
        <span className="cta-seal-arrow" aria-hidden>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
        </span>
    </Link>
);

const CTASection = () => {
    const { t } = useTranslation();
    const words = WORDS.map(w => t(`services.${w}.title`));
    const track = [...words, ...words, ...words];

    return (
        <section className="cta-section" aria-labelledby="cta-heading">
            <div className="cta-marquee" aria-hidden>
                <div className="cta-marquee-track">
                    {track.map((w, i) => <span key={i}>{w}<i /></span>)}
                </div>
            </div>

            <div className="container container--wide cta-layout">
                <div className="cta-content">
                    <h2 id="cta-heading" className="cta-title">{t('cta.title')}</h2>
                    <p className="cta-subtitle">{t('cta.subtitle')}</p>
                    <div className="cta-actions">
                        <Link to="/contacto" className="btn btn-primary btn-lg cta-btn">{t('cta.button')}</Link>
                        <a href="mailto:contacto@ajmptech.com" className="cta-mail">contacto@ajmptech.com</a>
                    </div>
                </div>
                <Seal text={t('cta.seal')} />
            </div>
        </section>
    );
};

export default CTASection;
