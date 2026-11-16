import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Browser, Phone } from '../common/Devices';
import { projects, getProjectBySlug, hostOf } from '../../data/projects';
import { clientById } from '../../data/clients';
import chip from '../../assets/animacion/pc/chip.webp';

// Proyecto principal → empresa cuyo logo lo acompaña
const MAIN = [['inperca', 'inperca'], ['vap360', 'vapretail'], ['sirius', 'planetarium'], ['totemiq', 'totemiq'], ['totems-del-inca', 'totems']];

const Status = ({ p }) => {
    const { t } = useTranslation();
    if (p.link) return <a className="hm-link" href={p.link} target="_blank" rel="noopener noreferrer">{hostOf(p.link)} ↗</a>;
    if (p.private) return <span className="hm-tag">{t('rd.cases.private')}</span>;
    return <span className="hm-muted">{p.categoryLabel}</span>;
};

/** Una parada del circuito: la pista amarilla baja con el scroll y se ramifica hacia el proyecto. */
const Stop = ({ slug, clientId, flip }) => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] });
    const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
    const down = useTransform(p, [0, 1], [0, 1]);
    const side = useTransform(p, [0.3, 0.6], [0, 1]);
    const pop = useTransform(p, [0.45, 0.75], [0, 1]);
    const lift = useTransform(p, [0.45, 0.75], [40, 0]);
    const proj = getProjectBySlug(slug);
    const c = clientById(clientId);
    if (!proj) return null;
    const phones = proj.orientation === 'portrait';

    return (
        <div className={`hm-stop${flip ? ' is-flip' : ''}`} ref={ref}>
            <Motion.article className="hm-stop-card" style={reduce ? undefined : { opacity: pop, y: lift }}>
                {phones ? (
                    <div className="hm-phones">
                        {proj.images.slice(0, 3).map((src) => <Phone key={src}><img src={src} alt={t(proj.name)} loading="lazy" decoding="async" /></Phone>)}
                    </div>
                ) : (
                    <Browser url={proj.link ? hostOf(proj.link) : t(proj.name)}>
                        <img src={proj.thumbnail} alt={t(proj.name)} loading="lazy" decoding="async" />
                    </Browser>
                )}
                <div className="hm-stop-meta"><h3>{t(proj.name)}</h3><Status p={proj} /></div>
            </Motion.article>

            <div className="hm-trace" aria-hidden="true">
                <span className="hm-trace-rail" />
                <Motion.span className="hm-trace-live" style={reduce ? undefined : { scaleY: down }} />
                <Motion.span className="hm-trace-branch" style={reduce ? undefined : { scaleX: side }} />
                <img className="hm-trace-chip" src={chip} alt="" loading="lazy" decoding="async" />
            </div>

            <Motion.div className="hm-stop-client" style={reduce ? undefined : { opacity: pop }}>
                {c?.white ? <img src={c.white} alt={c.name} loading="lazy" decoding="async" /> : <b>{c?.name}</b>}
            </Motion.div>
        </div>
    );
};

/** Trabajo: se baja por el circuito (una sola pista amarilla continua). Los demás proyectos van en su propia sección, conectados a la misma pista. */
const FeaturedProjects = () => {
    const { t } = useTranslation();
    const mainSlugs = MAIN.map(([slug]) => slug);
    const rest = projects.filter((p) => !mainSlugs.includes(p.slug));

    return (
        <>
            <section className="hm-circuit" id="trabajo">
                <div className="hm-wrap">
                    {MAIN.map(([slug, clientId], i) => <Stop key={slug} slug={slug} clientId={clientId} flip={i % 2 === 1} />)}
                </div>
            </section>

            <section className="hm-more">
                <div className="hm-wrap">
                    <div className="hm-more-head"><h2>{t('rd.cases.more')}</h2></div>
                    <ul className="hm-more-grid">
                        {rest.map((p) => (
                            <li key={p.id}>
                                <img className="hm-more-chip" src={chip} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                                <div className="hm-more-shot"><img src={p.thumbnail} alt="" loading="lazy" decoding="async" /></div>
                                <h3>{t(p.name)}</h3>
                                <Status p={p} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default FeaturedProjects;
