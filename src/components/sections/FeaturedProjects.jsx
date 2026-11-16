import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { Browser } from '../common/Devices';
import { projects, getProjectBySlug, hostOf } from '../../data/projects';
import { clientById } from '../../data/clients';

// Proyecto principal → empresa cuyo logo lo acompaña
const MAIN = [['inperca', 'inperca'], ['vap360', 'vapretail'], ['sirius', 'planetarium'], ['totemiq', 'totemiq']];
const ease = [0.16, 1, 0.3, 1];

const Status = ({ p }) => {
    const { t } = useTranslation();
    if (p.link) return <a className="hm-link" href={p.link} target="_blank" rel="noopener noreferrer">{hostOf(p.link)} ↗</a>;
    if (p.private) return <span className="hm-tag">{t('rd.cases.private')}</span>;
    return <span className="hm-muted">{p.categoryLabel}</span>;
};

/** Trabajo: las cuatro empresas principales en grande, cada captura dentro de un marco de navegador; el resto, en cuadrícula. */
const FeaturedProjects = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const mainSlugs = MAIN.map(([slug]) => slug);
    const rest = projects.filter((p) => !mainSlugs.includes(p.slug));
    const reveal = (i) => (reduce ? {} : {
        initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.9, ease, delay: (i % 4) * 0.07 }
    });

    return (
        <section className="hm-work" id="trabajo">
            <div className="hm-wrap">
                <h2 className="hm-h2">{t('rd.cases.title')}</h2>
                <div className="hm-main">
                    {MAIN.map(([slug, clientId], i) => {
                        const p = getProjectBySlug(slug);
                        const c = clientById(clientId);
                        if (!p) return null;
                        return (
                            <Motion.article className="hm-card" key={p.id} {...reveal(i)}>
                                <div className="hm-card-stage">
                                    <Browser url={p.link ? hostOf(p.link) : t(p.name)}>
                                        <img src={p.thumbnail} alt={t(p.name)} loading="lazy" decoding="async" />
                                    </Browser>
                                </div>
                                <div className="hm-card-body">
                                    <div className="hm-card-client">{c?.logo ? <img src={c.logo} alt={c.name} loading="lazy" decoding="async" /> : <b>{c?.name}</b>}</div>
                                    <h3>{t(p.name)}</h3>
                                    <p>{t(p.shortDescription)}</p>
                                    <Status p={p} />
                                </div>
                            </Motion.article>
                        );
                    })}
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
