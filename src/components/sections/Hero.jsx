import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import planta from '../../assets/projects/planta-llipata/hero.webp';
import plantaB from '../../assets/projects/planta-llipata/servicios.webp';
import totemiq from '../../assets/projects/totemiq/galeria.webp';
import erp from '../../assets/projects/erp-base/control-resumen.webp';
import bmn from '../../assets/projects/grupo-bmn/home.webp';
import lima from '../../assets/projects/lima-basics/home.webp';
import sirius from '../../assets/projects/sirius/login.webp';
import obra from '../../assets/projects/web-construccion/hero.webp';
import collage from '../../assets/projects/collage-interactivo/canvas.webp';
import clinica from '../../assets/projects/bd-clinica/dashboard.webp';
import makko from '../../assets/projects/makko/makko-arena-victory.webp';
import rokkoA from '../../assets/animacion/clips/rokko-a.mp4';
import rokkoAPoster from '../../assets/animacion/clips/rokko-a.webp';
import rokkoB from '../../assets/animacion/clips/rokko-b.mp4';
import rokkoBPoster from '../../assets/animacion/clips/rokko-b.webp';
import legadoA from '../../assets/animacion/clips/legado-a.mp4';
import legadoAPoster from '../../assets/animacion/clips/legado-a.webp';
import legadoB from '../../assets/animacion/clips/legado-b.mp4';
import legadoBPoster from '../../assets/animacion/clips/legado-b.webp';

const ROWS = [
    [{ img: planta }, { video: rokkoA, poster: rokkoAPoster }, { img: erp }, { img: totemiq }, { video: legadoA, poster: legadoAPoster }, { img: bmn }, { img: makko, tall: true }, { img: lima }],
    [{ img: sirius }, { video: legadoB, poster: legadoBPoster }, { img: obra }, { img: collage }, { video: rokkoB, poster: rokkoBPoster }, { img: clinica }, { img: plantaB }]
];

const Tile = ({ item, reduce }) => {
    if (item.video) {
        return (
            <li className="rd-tile rd-tile--tall">
                {reduce
                    ? <img src={item.poster} alt="" decoding="async" />
                    : <video src={item.video} poster={item.poster} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture tabIndex={-1} />}
            </li>
        );
    }
    return <li className={`rd-tile${item.tall ? ' rd-tile--tall' : ''}`}><img src={item.img} alt="" decoding="async" /></li>;
};

const ease = [0.16, 1, 0.3, 1];

/** Hero a pantalla completa: titular + muro en movimiento con sitios reales y clips de las series. */
const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const wall = useRef(null);
    const rise = (delay) => (reduce ? {} : {
        initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay }
    });

    // Los videos solo corren mientras el hero está en pantalla.
    useEffect(() => {
        const el = wall.current;
        if (!el || reduce || !('IntersectionObserver' in window)) return undefined;
        const io = new IntersectionObserver(([e]) => {
            el.querySelectorAll('video').forEach((v) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
            el.classList.toggle('is-paused', !e.isIntersecting);
        }, { threshold: 0.05 });
        io.observe(el);
        return () => io.disconnect();
    }, [reduce]);

    return (
        <section className="rd-top">
            <div className="rd-stars" aria-hidden="true" />
            <div className="rd-wrap rd-top-copy">
                <Motion.h1 {...rise(0)}>
                    {t('rd.hero.line1')} <em>{t('rd.hero.accent')}</em> {t('rd.hero.rest')}
                </Motion.h1>
                <Motion.div className="rd-top-side" {...rise(0.15)}>
                    <p className="rd-lead">{t('rd.hero.sub')}</p>
                    <div className="rd-cta">
                        <a className="rd-btn rd-btn--y" href="#proyectos">{t('rd.hero.ctaProjects')}</a>
                        <Link className="rd-btn rd-btn--ghost" to="/animacion">{t('rd.hero.ctaAnim')}</Link>
                    </div>
                </Motion.div>
            </div>
            <Motion.div
                ref={wall}
                className="rd-wall"
                aria-hidden="true"
                {...(reduce ? {} : { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, ease, delay: 0.3 } })}
            >
                {ROWS.map((row, i) => (
                    <ul className={`rd-wall-row${i % 2 ? ' rd-wall-row--rev' : ''}`} key={i}>
                        {[...row, ...row].map((item, j) => <Tile item={item} reduce={reduce} key={j} />)}
                    </ul>
                ))}
            </Motion.div>
        </section>
    );
};

export default Hero;
