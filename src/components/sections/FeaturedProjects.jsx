import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects, getProjectBySlug, hostOf } from '../../data/projects';

const SCENES = ['vap360', 'sirius', 'erp-base', 'makko', 'planta-llipata'];

/** Una escena a pantalla completa por proyecto. Se apilan al hacer scroll, como planos de una película. */
const Scene = ({ p }) => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['22%', '0%']);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const shots = p.orientation === 'portrait' ? p.images.slice(0, 3) : [p.thumbnail];

    return (
        <article className="rd-scene" ref={ref} style={{ '--case': p.color }}>
            <div className="rd-scene-bg" style={{ backgroundImage: `url(${p.thumbnail})` }} aria-hidden="true" />
            <div className="rd-scene-in">
                {p.logo && <img className="rd-scene-logo" src={p.logo} alt="" loading="lazy" decoding="async" />}
                <h3>{t(p.name)}</h3>
                <p>{t(p.shortDescription)}</p>
                {p.link
                    ? <a className="rd-btn rd-btn--y" href={p.link} target="_blank" rel="noopener noreferrer">{hostOf(p.link)} ↗</a>
                    : p.private && <span className="rd-badge">{t('rd.cases.private')}</span>}
                <Motion.div className={`rd-scene-shot is-${p.orientation}`} style={reduce ? undefined : { y, scale }}>
                    {shots.map((src) => <img key={src} src={src} alt={t(p.name)} loading="lazy" decoding="async" />)}
                </Motion.div>
            </div>
        </article>
    );
};

const FeaturedProjects = () => {
    const { t } = useTranslation();
    const scenes = SCENES.map(getProjectBySlug).filter(Boolean);
    const rest = projects.filter((p) => !SCENES.includes(p.slug));

    return (
        <section className="rd-film" id="trabajo">
            <h2 className="rd-film-title">{t('rd.cases.title')}</h2>
            {scenes.map((p) => <Scene key={p.id} p={p} />)}
            <div className="rd-more">
                <h3 className="rd-more-title">{t('rd.cases.more')}</h3>
                <ul className="rd-more-row">
                    {rest.map((p) => {
                        const inner = (
                            <>
                                <img src={p.thumbnail} alt="" loading="lazy" decoding="async" />
                                <span className="rd-more-info">
                                    <strong>{t(p.name)}</strong>
                                    <em>{p.link ? `${hostOf(p.link)} ↗` : p.categoryLabel}</em>
                                </span>
                            </>
                        );
                        return (
                            <li key={p.id} style={{ '--case': p.color }}>
                                {p.link
                                    ? <a href={p.link} target="_blank" rel="noopener noreferrer">{inner}</a>
                                    : <div>{inner}</div>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default FeaturedProjects;
