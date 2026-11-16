import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { projects, hostOf } from '../../data/projects';

const FIRST = 6;
const spring = { type: 'spring', stiffness: 90, damping: 16 };

/** Proyectos en zigzag de dos columnas: logo, captura y enlace real. Sin personajes: esta sección es de trabajo serio. */
const FeaturedProjects = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const [all, setAll] = useState(false);
    const list = all ? projects : projects.slice(0, FIRST);

    return (
        <section className="rd-work" id="proyectos">
            <div className="rd-wrap">
                <h2 className="rd-h2">{t('rd.cases.title')}</h2>
                <div className="rd-work-grid">
                    {list.map((p) => (
                        <Motion.article
                            className="rd-work-card"
                            key={p.id}
                            style={{ '--case': p.color }}
                            initial={reduce ? false : { opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={spring}
                        >
                            <Link className={`rd-work-shot is-${p.orientation}`} to={`/proyectos/${p.slug}`} aria-label={t(p.name)}>
                                <img src={p.thumbnail} alt="" loading="lazy" decoding="async" />
                            </Link>
                            <div className="rd-work-body">
                                <div className="rd-work-head">
                                    <h3>{t(p.name)}</h3>
                                    {p.logo && <img className="rd-work-logo" src={p.logo} alt="" loading="lazy" decoding="async" />}
                                </div>
                                <p>{t(p.shortDescription)}</p>
                                <div className="rd-work-links">
                                    {p.link
                                        ? <a className="rd-btn rd-btn--sm" href={p.link} target="_blank" rel="noopener noreferrer">{hostOf(p.link)} ↗</a>
                                        : p.private && <span className="rd-badge">{t('rd.cases.private')}</span>}
                                    <Link className="rd-link" to={`/proyectos/${p.slug}`}>{t('rd.cases.viewCase')}</Link>
                                </div>
                            </div>
                        </Motion.article>
                    ))}
                </div>
                {projects.length > FIRST && (
                    <button type="button" className="rd-btn rd-btn--ghost rd-work-more" onClick={() => setAll((v) => !v)} aria-expanded={all}>
                        {t(all ? 'rd.cases.less' : 'rd.cases.all')}
                    </button>
                )}
            </div>
        </section>
    );
};

export default FeaturedProjects;
