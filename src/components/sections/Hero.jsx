import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import reel from '../../assets/reel/reel.mp4';
import poster from '../../assets/reel/poster.webp';

const ease = [0.16, 1, 0.3, 1];

/** Portada: un rectángulo que ocupa toda la pantalla con un video de los sitios reales. Al bajar, el contenido lo cubre. */
const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const video = useRef(null);
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 700], [1, 0.94]);
    const opacity = useTransform(scrollY, [0, 700], [1, 0.45]);

    useEffect(() => {
        const el = video.current;
        if (!el || !('IntersectionObserver' in window)) return undefined;
        const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.05 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const rise = (delay) => (reduce ? {} : {
        initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay }
    });

    return (
        <section className="hm-cover">
            <Motion.div className="hm-cover-panel" style={reduce ? undefined : { scale, opacity }}>
                {reduce
                    ? <img className="hm-cover-media" src={poster} alt="" />
                    : <video ref={video} className="hm-cover-media" src={reel} poster={poster} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture tabIndex={-1} aria-hidden="true" />}
                <div className="hm-cover-in">
                    <Motion.h1 {...rise(0.1)}>
                        {t('rd.hero.line1')} <em>{t('rd.hero.accent')}</em> {t('rd.hero.rest')}
                    </Motion.h1>
                    <Motion.div className="hm-cover-side" {...rise(0.25)}>
                        <p>{t('rd.hero.sub')}</p>
                        <div className="hm-cover-cta">
                            <a className="rd-btn rd-btn--y" href="#trabajo">{t('rd.hero.ctaProjects')}</a>
                            <Link className="rd-btn rd-btn--ghost" to="/animacion">{t('rd.hero.ctaAnim')}</Link>
                        </div>
                    </Motion.div>
                </div>
            </Motion.div>
        </section>
    );
};

export default Hero;
