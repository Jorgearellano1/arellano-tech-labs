import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ParallaxScene, Layer } from '../common/Parallax';
import shot from '../../assets/projects/planta-llipata/hero.webp';
import ushico from '../../assets/animacion/ushico.webp';
import roko from '../../assets/animacion/roko.webp';
import pip from '../../assets/animacion/pip.webp';
import mayo from '../../assets/animacion/mayo.webp';

const ease = [0.16, 1, 0.3, 1];
const spring = { type: 'spring', stiffness: 120, damping: 14 };

const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const rise = (delay) => (reduce ? {} : {
        initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay }
    });
    const pop = (delay, from = 90) => (reduce ? {} : {
        initial: { opacity: 0, y: from, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { ...spring, delay }
    });

    return (
        <section className="rd-hero rd-night">
            <div className="rd-stars" aria-hidden="true" />
            <div className="rd-wrap rd-hero-copy">
                <Motion.h1 {...rise(0)}>
                    {t('rd.hero.line1')} <em>{t('rd.hero.accent')}</em> {t('rd.hero.rest')}
                </Motion.h1>
                <Motion.p className="rd-lead" {...rise(0.12)}>{t('rd.hero.sub')}</Motion.p>
                <Motion.div className="rd-cta" {...rise(0.22)}>
                    <Link className="rd-btn" to="/proyectos">{t('rd.hero.ctaProjects')}</Link>
                    <Link className="rd-btn rd-btn--ghost" to="/animacion">{t('rd.hero.ctaAnim')}</Link>
                </Motion.div>
            </div>

            <ParallaxScene className="rd-hero-scene" aria-hidden="true">
                <Layer depth={0.2} travel={50} className="rd-browser">
                    <Motion.div {...pop(0.3, 60)}>
                        <div className="rd-browser-bar"><i /><i /><i /><span>plantallipata.com</span></div>
                        <img src={shot} alt="" decoding="async" fetchPriority="high" />
                    </Motion.div>
                </Layer>
                <Layer depth={0.9} travel={150} className="rd-hc rd-hc--mayo"><Motion.div {...pop(0.75, -60)}><img className="rd-float rd-float--c" src={mayo} alt="" /></Motion.div></Layer>
                <Layer depth={1.1} travel={170} className="rd-hc rd-hc--pip"><Motion.div {...pop(0.9, -60)}><img className="rd-float rd-float--b" src={pip} alt="" /></Motion.div></Layer>
                <Layer depth={0.6} travel={110} className="rd-hc rd-hc--roko"><Motion.div {...pop(0.5)}><img className="rd-float" src={roko} alt="" /></Motion.div></Layer>
                <Layer depth={0.7} travel={120} className="rd-hc rd-hc--ushico"><Motion.div {...pop(0.62)}><img className="rd-float rd-float--b" src={ushico} alt="" /></Motion.div></Layer>
                <Layer depth={0.45} travel={90} className="rd-hero-tag">{t('rd.hero.live')}</Layer>
            </ParallaxScene>
        </section>
    );
};

export default Hero;
