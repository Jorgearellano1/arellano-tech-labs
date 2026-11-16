import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { projects, getProjectBySlug, hostOf } from '../../data/projects';

const MAIN = ['inperca', 'vap360', 'sirius', 'totemiq'];
const ease = [0.16, 1, 0.3, 1];

const Status = ({ p }) => {
    const { t } = useTranslation();
    if (p.link) return <a className="hm-link" href={p.link} target="_blank" rel="noopener noreferrer">{hostOf(p.link)} ↗</a>;
    if (p.private) return <span className="rd-badge">{t('rd.cases.private')}</span>;
    return <span className="hm-muted">{p.categoryLabel}</span>;
};

/** Trabajo: las cuatro empresas principales en grande y el resto en una cuadrícula compacta. */
const FeaturedProjects = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const main = MAIN.map(getProjectBySlug).filter(Boolean);
    const rest = projects.filter((p) => !MAIN.includes(p.slug));
    const reveal = (i) => (reduce ? {} : {
        initial: { opacity: 0, y: 36 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.8, ease, delay: (i % 4) * 0.06 }
    });

    return (
        <section className="hm-work" id="trabajo">
            <div className="hm-wrap">
                <h2 className="hm-h2">{t('rd.cases.title')}</h2>
                <div className="hm-main">
                    {main.map((p, i) => (
                        <Motion.article className="hm-card" key={p.id} {...reveal(i)}>
                            <div className="hm-card-shot"><img src={p.thumbnail} alt={t(p.name)} loading="lazy" decoding="async" /></div>
                            <div className="hm-card-body">
                                <div className="hm-card-client">
                                    {p.clientLogo ? <img src={p.clientLogo} alt={p.client} loading="lazy" decoding="async" /> : <b>{p.client}</b>}
                                </div>
                                <div className="hm-card-text">
                                    <h3>{t(p.name)}</h3>
                                    <p>{t(p.shortDescription)}</p>
                                    <Status p={p} />
                                </div>
                            </div>
                        </Motion.article>
                    ))}
                </div>

                <h3 className="hm-h3">{t('rd.cases.more')}</h3>
                <div className="hm-rest">
                    {rest.map((p, i) => (
                        <Motion.article className="hm-mini" key={p.id} {...reveal(i)}>
                            <div className={`hm-mini-shot is-${p.orientation}`}><img src={p.thumbnail} alt="" loading="lazy" decoding="async" /></div>
                            <h4>{t(p.name)}</h4>
                            <Status p={p} />
                        </Motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
