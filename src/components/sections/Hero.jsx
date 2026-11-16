import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import planta from '../../assets/projects/planta-llipata/hero.webp';
import totemiq from '../../assets/projects/totemiq/galeria.webp';
import erp from '../../assets/projects/erp-base/control-resumen.webp';
import bmn from '../../assets/projects/grupo-bmn/home.webp';
import lima from '../../assets/projects/lima-basics/home.webp';
import makko from '../../assets/projects/makko/makko-arena-victory.webp';
import rokkoA from '../../assets/animacion/clips/rokko-a.mp4';
import rokkoAPoster from '../../assets/animacion/clips/rokko-a.webp';
import rokkoB from '../../assets/animacion/clips/rokko-b.mp4';
import rokkoBPoster from '../../assets/animacion/clips/rokko-b.webp';
import legadoA from '../../assets/animacion/clips/legado-a.mp4';
import legadoAPoster from '../../assets/animacion/clips/legado-a.webp';
import legadoB from '../../assets/animacion/clips/legado-b.mp4';
import legadoBPoster from '../../assets/animacion/clips/legado-b.webp';

// Mosaico: cada letra es un área de la cuadrícula (ver .rd-mosaic en redesign.css).
const TILES = [
    { area: 'a', img: planta }, { area: 'b', video: rokkoA, poster: rokkoAPoster }, { area: 'c', img: erp },
    { area: 'd', video: legadoA, poster: legadoAPoster }, { area: 'e', img: makko, fit: 'contain' },
    { area: 'f', video: rokkoB, poster: rokkoBPoster }, { area: 'g', img: totemiq }, { area: 'h', video: legadoB, poster: legadoBPoster },
    { area: 'i', img: bmn }, { area: 'j', img: lima }
];

const ease = [0.16, 1, 0.3, 1];

/** Portada tipo cartel: mosaico a pantalla completa con sitios reales y clips de las series, y la marca al centro. */
const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
    const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

    useEffect(() => {
        const el = ref.current;
        if (!el || reduce || !('IntersectionObserver' in window)) return undefined;
        const io = new IntersectionObserver(([e]) => {
            el.querySelectorAll('video').forEach((v) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
        }, { threshold: 0.05 });
        io.observe(el);
        return () => io.disconnect();
    }, [reduce]);

    const pop = (i) => (reduce ? {} : {
        initial: { opacity: 0, scale: 0.82 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, ease, delay: 0.08 * i }
    });

    return (
        <section className="rd-cover" ref={ref}>
            <Motion.ul className="rd-mosaic" style={reduce ? undefined : { scale, opacity }}>
                {TILES.map((tile, i) => (
                    <Motion.li key={tile.area} style={{ gridArea: tile.area }} aria-hidden="true" {...pop(i + 1)}>
                        {tile.video && !reduce
                            ? <video src={tile.video} poster={tile.poster} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture tabIndex={-1} />
                            : <img src={tile.img || tile.poster} alt="" decoding="async" style={tile.fit ? { objectFit: tile.fit } : undefined} />}
                    </Motion.li>
                ))}
                <Motion.li className="rd-mosaic-brand" style={{ gridArea: 'L' }} {...pop(0)}>
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                        <path d="M24 76 50 22l26 54" fill="none" stroke="#15130F" strokeWidth="13" strokeMiterlimit="6" />
                        <path fill="#fff" d="M50 52 62 78H38Z" />
                    </svg>
                    <h1>AJM<small>Technology</small></h1>
                </Motion.li>
            </Motion.ul>
            <div className="rd-cover-bar">
                <p>{t('rd.hero.line1')} <em>{t('rd.hero.accent')}</em> {t('rd.hero.rest')}</p>
                <a className="rd-btn rd-btn--y" href="#trabajo">{t('rd.hero.ctaProjects')}</a>
                <Link className="rd-btn rd-btn--ghost" to="/animacion">{t('rd.hero.ctaAnim')}</Link>
            </div>
        </section>
    );
};

export default Hero;
