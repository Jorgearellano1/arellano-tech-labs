import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ParallaxScene, Layer } from '../common/Parallax';
import shot from '../../assets/projects/planta-llipata/hero.webp';
import ushico from '../../assets/animacion/ushico.webp';

const ease = [0.16, 1, 0.3, 1];

const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const rise = (delay) => (reduce ? {} : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease, delay }
    });

    return (
        <section className="rd-hero">
            <div className="rd-wrap rd-hero-grid">
                <div className="rd-hero-copy">
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
                    <Layer depth={0.25} travel={60} className="rd-browser">
                        <div className="rd-browser-bar"><i /><i /><i /><span>plantallipata.com</span></div>
                        <img src={shot} alt="" decoding="async" fetchPriority="high" />
                    </Layer>
                    <Layer depth={0.5} travel={90} className="rd-hero-tag">{t('rd.hero.live')}</Layer>
                    <Layer depth={1} travel={160} className="rd-hero-wedge" />
                    <Layer depth={0.75} travel={130} className="rd-hero-char">
                        <img className="rd-float" src={ushico} alt="" decoding="async" />
                    </Layer>
                </ParallaxScene>
            </div>
        </section>
    );
};

export default Hero;
