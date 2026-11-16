import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { getProjectBySlug, hostOf } from '../../data/projects';
import pip from '../../assets/animacion/pip.webp';
import mina from '../../assets/animacion/mina.webp';
import mayo from '../../assets/animacion/mayo.webp';
import tari from '../../assets/animacion/tari.webp';

const CASES = ['vap360', 'sirius', 'planta-llipata', 'totemiq'];
const PEEK = [pip, mina, mayo, tari];
const spring = { type: 'spring', stiffness: 90, damping: 16 };

/** Muro de casos: paneles de color con logo, captura y enlace real; un personaje se asoma en cada uno. */
const FeaturedProjects = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const cases = CASES.map(getProjectBySlug).filter(Boolean);

    return (
        <section className="rd-cases rd-night" id="proyectos">
            <div className="rd-wrap">
                <h2 className="rd-h2">{t('rd.cases.title')}</h2>
                {cases.map((p, i) => (
                    <Motion.article
                        className="rd-case"
                        key={p.id}
                        style={{ '--case': p.color }}
                        initial={reduce ? false : { opacity: 0, y: 70, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={spring}
                    >
                        <img className="rd-case-peek rd-float" src={PEEK[i % PEEK.length]} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                        <div className="rd-case-copy">
                            {p.logo && <img className="rd-case-logo" src={p.logo} alt="" loading="lazy" decoding="async" />}
                            <h3>{t(p.name)}</h3>
                            <p>{t(p.shortDescription)}</p>
                            <div className="rd-case-links">
                                {p.link
                                    ? <a className="rd-btn rd-btn--sm" href={p.link} target="_blank" rel="noopener noreferrer">{hostOf(p.link)} ↗</a>
                                    : p.private && <span className="rd-badge">{t('rd.cases.private')}</span>}
                                <Link className="rd-link" to={`/proyectos/${p.slug}`}>{t('rd.cases.viewCase')}</Link>
                            </div>
                        </div>
                        <div className="rd-case-shot">
                            <img src={p.thumbnail} alt={t(p.name)} loading="lazy" decoding="async" />
                        </div>
                    </Motion.article>
                ))}
                <Link className="rd-btn rd-btn--ghost" to="/proyectos">{t('rd.cases.all')}</Link>
            </div>
        </section>
    );
};

export default FeaturedProjects;
